import { Component, TextFile, awscdk } from 'projen';
import { PROJEN_MARKER } from 'projen/lib/common';
import { NodePackageManager } from 'projen/lib/javascript';
import { PipelineEngine } from '../engine';
import { PipelineStep } from '../steps';

/**
 * The Environment interface is designed to hold AWS related information
 * for a specific deployment environment within your infrastructure.
 * Each environment requires a specific account and region for its resources.
 */
export interface Environment {
  /**
   * The AWS Account ID associated with the environment. It's important because
   * different services or features could have distinct permissions and settings
   * in different accounts.
   */
  readonly account: string;

  /**
   * The AWS Region for the environment. This determines where your resources
   * are created and where your application will run. It can affect latency,
   * availability, and pricing.
   */
  readonly region: string;
}

// /**
//  * Describes the type of pipeline that will be created
//  */
// export enum DeploymentType {
//   /** Deploy every commit as far as possible; hopefully into production */
//   CONTINUOUS_DEPLOYMENT,
//   /** Build every commit and prepare all assets for a later deployment */
//   CONTINUOUS_DELIVERY,
// }

export interface DeploymentStage {
  readonly name: string;
  readonly env: Environment;
  readonly manualApproval?: boolean;
}

export interface StageOptions {
  readonly env: Environment;
}

/**
 * The CDKPipelineOptions interface is designed to provide configuration
 * options for a CDK (Cloud Development Kit) pipeline. It allows the definition
 * of settings such as the stack prefix and package namespace to be used in the
 * AWS stack, along with the environments configuration to be used.
 */
export interface CDKPipelineOptions {

  /**
   * the name of the branch to deploy from
   * @default main
   */
  readonly branchName?: string;

  /**
   * This field is used to define a prefix for the AWS Stack resources created
   * during the pipeline's operation.
   *
   * @default project name
   */
  readonly stackPrefix?: string;

  /**
   * If set to true all CDK actions will also include <stackName>/* to deploy/diff/destroy sub stacks of the main stack.
   * You can use this to deploy CDk applications containing multiple stacks.
   *
   * @default false
   */
  readonly deploySubStacks?: boolean;

  /**
   * This field determines the NPM namespace to be used when packaging CDK cloud
   * assemblies. A namespace helps group related resources together, providing
   * better organization and ease of management.
   */
  readonly pkgNamespace: string;

  readonly stages: DeploymentStage[];

  readonly personalStage?: StageOptions;

  readonly featureStages?: StageOptions;

  // /**
  //  * This field specifies the type of pipeline to create. If set to CONTINUOUS_DEPLOYMENT,
  //  * every commit is deployed as far as possible, hopefully into production. If set to
  //  * CONTINUOUS_DELIVERY, every commit is built and all assets are prepared for a later deployment.
  //  *
  //  * @default CONTINUOUS_DELIVERY
  //  */
  // readonly deploymentType?: DeploymentType;

  readonly preInstallCommands?: string[];
  readonly preSynthCommands?: string[];
  readonly postSynthCommands?: string[];

  readonly preInstallSteps?: PipelineStep[];
  readonly preSynthSteps?: PipelineStep[];
  readonly postSynthSteps?: PipelineStep[];
}

/**
 * The CDKPipeline class extends the Component class and sets up the necessary configuration for deploying AWS CDK (Cloud Development Kit) applications across multiple stages.
 * It also manages tasks such as publishing CDK assets, bumping version based on git tags, and cleaning up conflicting tasks.
 */
export abstract class CDKPipeline extends Component {

  public readonly stackPrefix: string;
  public readonly branchName: string;

  constructor(protected app: awscdk.AwsCdkTypeScriptApp, private baseOptions: CDKPipelineOptions) {
    super(app);

    // Add development dependencies
    this.app.addDevDeps(
      '@types/standard-version',
      'standard-version',
      'cdk-assets',
    );
    // this.app.addDeps(
    // );
    this.project.gitignore.exclude('/cdk-outputs-*.json');

    this.stackPrefix = baseOptions.stackPrefix ?? app.name;
    this.branchName = baseOptions.branchName ?? 'main'; // TODO use defaultReleaseBranch of NodeProject

    // Removes the compiled cloud assembly before each synth
    this.project.tasks.tryFind('synth')?.prependExec(`rm -rf ${this.app.cdkConfig.cdkout}`);
    this.project.tasks.tryFind('synth:silent')?.prependExec(`rm -rf ${this.app.cdkConfig.cdkout}`);

    // Remove tasks that might conflict with the pipeline process
    this.project.removeTask('deploy');
    this.project.removeTask('diff');
    this.project.removeTask('destroy');
    this.project.removeTask('watch');

    // Creates different deployment stages
    if (baseOptions.personalStage) {
      this.createPersonalStage();
    }
    if (baseOptions.featureStages) {
      this.createFeatureStage();
    }
    for (const stage of baseOptions.stages) {
      this.createPipelineStage(stage);
    }

    // Creates tasks to handle the release process
    this.createReleaseTasks();

    // Creates a specialized CDK App class
    this.createApplicationEntrypoint();

  }

  public abstract engineType(): PipelineEngine;

  protected renderInstallCommands(): string[] {
    return [
      ...(this.baseOptions.preInstallCommands ?? []),
      `npx projen ${this.app.package.installCiTask.name}`,
    ];
  }

  protected renderInstallPackageCommands(packageName: string, runPreInstallCommands: boolean = false): string[] {
    const commands = runPreInstallCommands ? this.baseOptions.preInstallCommands ?? [] : [];

    switch (this.app.package.packageManager) {
      case NodePackageManager.YARN:
      case NodePackageManager.YARN2:
      case NodePackageManager.YARN_BERRY:
      case NodePackageManager.YARN_CLASSIC:
        commands.push(`yarn add ${packageName}`);
        break;
      case NodePackageManager.NPM:
        commands.push(`npm install ${packageName}`);
        break;
      default:
        throw new Error('No install scripts for packageManager: ' + this.app.package.packageManager);
    }
    return commands;
  }

  protected renderSynthCommands(): string[] {
    return [
      ...(this.baseOptions.preSynthCommands ?? []),
      'npx projen build',
      ...(this.baseOptions.postSynthCommands ?? []),
    ];
  }

  protected getAssetUploadCommands(needsVersionedArtifacts: boolean): string[] {
    return [
      'npx projen publish:assets',
      ...(needsVersionedArtifacts ? [
        'npx projen bump',
        'npx projen release:push-assembly',
      ] : []),
    ];
  }

  protected renderDeployCommands(stageName: string): string[] {
    return [
      `npx projen deploy:${stageName}`,
    ];
  }

  protected renderDiffCommands(stageName: string): string[] {
    return [
      `npx projen diff:${stageName}`,
    ];
  }

  /**
   * This method generates the entry point for the application, including interfaces and classes
   * necessary to set up the pipeline and define the AWS CDK stacks for different environments.
   */
  protected createApplicationEntrypoint() {
    let propsCode = '';
    let appCode = '';

    if (this.baseOptions.personalStage) {
      propsCode += `  /** This function will be used to generate a personal stack. */
  providePersonalStack: (app: App, stackId: string, props: PipelineAppStackProps) => Stack;
`;
      appCode += `    // If the environment variable USER is set and a function is provided for creating a personal stack, it is called with necessary arguments.
    if (props.providePersonalStack && process.env.USER) {
      const stageName = 'personal-' + process.env.USER.toLowerCase().replace(/\\\//g, '-');
      props.providePersonalStack(this, '${this.stackPrefix}-personal', { env: ${JSON.stringify(this.baseOptions.personalStage.env)}, stackName: \`${this.stackPrefix}-\${stageName}\`, stageName });
    }
`;
    }

    if (this.baseOptions.featureStages) {
      propsCode += `  /** This function will be used to generate a feature stack. */
  provideFeatureStack: (app: App, stackId: string, props: PipelineAppStackProps) => Stack;
`;
      appCode += `    // If the environment variable BRANCH is set and a function is provided for creating a feature stack, it is called with necessary arguments.
    if (props.provideFeatureStack && process.env.BRANCH) {
      const stageName = 'feature-' + process.env.BRANCH.toLowerCase().replace(/\\\//g, '-');
      props.provideFeatureStack(this, '${this.stackPrefix}-feature', { env: ${JSON.stringify(this.baseOptions.featureStages.env)}, stackName: \`${this.stackPrefix}-\${stageName}\`, stageName });
    }
`;
    }

    for (const stage of this.baseOptions.stages) {
      const nameUpperFirst = `${stage.name.charAt(0).toUpperCase()}${stage.name.substring(1)}`;

      propsCode += `  /** This function will be used to generate a ${stage.name} stack. */
  provide${nameUpperFirst}Stack: (app: App, stackId: string, props: PipelineAppStackProps) => Stack;
`;
      appCode += `    // If a function is provided for creating a ${stage.name} stack, it is called with necessary arguments.
    if (props.provide${nameUpperFirst}Stack) {
      props.provide${nameUpperFirst}Stack(this, '${this.stackPrefix}-${stage.name}', { env: ${JSON.stringify(stage.env)}, stackName: '${this.stackPrefix}-${stage.name}', stageName: '${stage.name}' });
    }
`;
    }

    const appFile = new TextFile(this.project, `${this.app.srcdir}/app.ts`);
    appFile.addLine(`// ${PROJEN_MARKER}
/* eslint-disable */
import { App, AppProps, Stack, StackProps } from 'aws-cdk-lib';

/**
 * PipelineAppProps is an extension of AppProps, which is part of the AWS CDK core.
 * It includes optional functions to provide AWS Stacks for different stages.
 *
 * Use these functions to instantiate your application stacks with the parameters for
 * each stage
 */
export interface PipelineAppProps extends AppProps {
${propsCode}
}

/**
 * PipelineAppStackProps is an extension of StackProps, which is part of the AWS CDK core.
 * It includes an additional property to specify the stage name.
 */
export interface PipelineAppStackProps extends StackProps {
  stageName: string;
}

/**
 * The PipelineApp class extends the App class from AWS CDK and overrides the constructor to support
 * different stages of the application (development, production, personal, feature) by invoking the provided
 * stack-providing functions from the props.
 */
export class PipelineApp extends App {
  constructor(props: PipelineAppProps) {
    super(props);

${appCode}

  }
}
`);
  }

  /**
   * This method sets up tasks to publish CDK assets to all accounts and handle versioning, including bumping the version
   * based on the latest git tag and pushing the CDK assembly to the package repository.
   */
  protected createReleaseTasks() {
    // Task to publish the CDK assets to all accounts
    this.project.addTask('publish:assets', {
      steps: this.baseOptions.stages.map(stage => ({
        exec: `npx cdk-assets -p ${this.app.cdkConfig.cdkout}/${this.stackPrefix}-${stage.name}.assets.json publish`,
      })),
    });

    this.project.addTask('bump', {
      description: 'Bumps version based on latest git tag',
      steps: [
        {
          exec: 'pipelines-release bump',
        },
        {
          exec: 'git push --tags',
        },
      ],
    });
    this.project.addTask('release:push-assembly', {
      steps: [
        {
          exec: `pipelines-release create-manifest "${this.app.cdkConfig.cdkout}"  "${this.baseOptions.pkgNamespace}"`,
        },
        {
          cwd: this.app.cdkConfig.cdkout,
          exec: 'npm version --no-git-tag-version from-git',
        },
        {
          cwd: this.app.cdkConfig.cdkout,
          exec: 'npm publish',
        },
      ],
    });
  }

  /**
   * This method sets up tasks for the personal deployment stage, including deployment, watching for changes,
   * comparing changes (diff), and destroying the stack when no longer needed.
   */
  protected createPersonalStage() {
    const stackId = this.getCliStackPattern('personal');
    this.project.addTask('deploy:personal', {
      exec: `cdk --outputs-file cdk-outputs-personal.json deploy ${stackId}`,
    });
    this.project.addTask('watch:personal', {
      exec: `cdk deploy --watch --hotswap ${stackId}`,
    });
    this.project.addTask('diff:personal', {
      exec: `cdk diff ${stackId}`,
    });
    this.project.addTask('destroy:personal', {
      exec: `cdk destroy ${stackId}`,
    });
  }

  /**
   * This method sets up tasks for the feature deployment stage, including deployment, comparing changes (diff),
   * and destroying the stack when no longer needed.
   */
  protected createFeatureStage() {
    const stackId = this.getCliStackPattern('feature');
    this.project.addTask('deploy:feature', {
      exec: `cdk --outputs-file cdk-outputs-feature.json --progress events --require-approval never deploy ${stackId}`,
    });
    this.project.addTask('diff:feature', {
      exec: `cdk diff ${stackId}`,
    });
    this.project.addTask('destroy:feature', {
      exec: `cdk destroy ${stackId}`,
    });
  }

  /**
   * This method sets up tasks for the general pipeline stages (dev, prod), including deployment and comparing changes (diff).
   * @param {DeployStageOptions} stage - The stage to create
   */
  protected createPipelineStage(stage: DeploymentStage) {
    const stackId = this.getCliStackPattern(stage.name);
    this.project.addTask(`deploy:${stage.name}`, {
      exec: `cdk --app ${this.app.cdkConfig.cdkout} --outputs-file cdk-outputs-${stage.name}.json --progress events --require-approval never deploy ${stackId}`,
    });
    this.project.addTask(`diff:${stage.name}`, {
      exec: `cdk --app ${this.app.cdkConfig.cdkout} diff ${stackId}`,
    });
  }

  protected getCliStackPattern(stage: string) {
    return this.baseOptions.deploySubStacks ? `${this.stackPrefix}-${stage} ${this.stackPrefix}-${stage}/*` : `${this.stackPrefix}-${stage}`;
  }
}