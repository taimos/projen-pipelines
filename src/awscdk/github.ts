import { awscdk } from 'projen';
import { GithubWorkflow } from 'projen/lib/github';
import { JobPermission } from 'projen/lib/github/workflows-model';
import { CDKPipeline, CDKPipelineOptions, DeploymentStage, IndependentStage } from './base';
import { PipelineEngine } from '../engine';
import { PipelineStep, SimpleCommandStep } from '../steps';
import { DownloadArtifactStep, UploadArtifactStep } from '../steps/artifact-steps';
import { AwsAssumeRoleStep } from '../steps/aws-assume-role.step';

const DEFAULT_RUNNER_TAGS = ['ubuntu-latest'];

/**
 * Configuration interface for GitHub-specific IAM roles used in the CDK pipeline.
 */
export interface GithubIamRoleConfig {

  /** Default IAM role ARN used if no specific role is provided. */
  readonly default?: string;
  /** IAM role ARN for the synthesis step. */
  readonly synth?: string;
  /** IAM role ARN for the asset publishing step. */
  readonly assetPublishing?: string;
  /** IAM role ARNs for different deployment stages. */
  readonly deployment?: { [stage: string]: string };
}

/**
 * Extension of the base CDKPipeline options including specific configurations for GitHub.
 */
export interface GithubCDKPipelineOptions extends CDKPipelineOptions {

  /** IAM config for GitHub Actions */
  readonly iamRoleArns: GithubIamRoleConfig;

  /**
   * runner tags to use to select runners
   *
   * @default ['ubuntu-latest']
   */
  readonly runnerTags?: string[];

  /** use GitHub Packages to store vesioned artifacts of cloud assembly; also needed for manual approvals */
  readonly useGithubPackagesForAssembly?: boolean;
}


/**
 * Implements a CDK Pipeline configured specifically for GitHub workflows.
 */
export class GithubCDKPipeline extends CDKPipeline {

  /** Indicates if versioned artifacts are needed based on manual approval requirements. */
  public readonly needsVersionedArtifacts: boolean;

  /** The GitHub workflow associated with the pipeline. */
  private deploymentWorkflow: GithubWorkflow;
  /** List of deployment stages for the pipeline. */
  private deploymentStages: string[] = [];

  protected useGithubPackages: boolean;

  /**
   * Constructs a new GithubCDKPipeline instance.
   * @param app - The CDK app associated with this pipeline.
   * @param options - Configuration options for the pipeline.
   */
  constructor(app: awscdk.AwsCdkTypeScriptApp, private options: GithubCDKPipelineOptions) {
    super(app, {
      ...options,
      ...options.useGithubPackagesForAssembly && {
        preInstallCommands: [
          'echo "GITHUB_TOKEN=${{ secrets.GITHUB_TOKEN }}" >> $GITHUB_ENV',
          ...(options.preInstallCommands ?? []),
        ],
      },
    });

    // Initialize the deployment workflow on GitHub.
    this.deploymentWorkflow = this.app.github!.addWorkflow('deploy');
    this.deploymentWorkflow.on({
      push: {
        branches: [this.branchName],
      },
      workflowDispatch: {},
    });

    // Determine if versioned artifacts are necessary.
    this.needsVersionedArtifacts = options.stages.find(s => s.manualApproval === true) !== undefined;;
    this.useGithubPackages = this.needsVersionedArtifacts && (options.useGithubPackagesForAssembly ?? false);

    if (this.useGithubPackages) {
      app.npmrc.addRegistry('https://npm.pkg.github.com', this.options.pkgNamespace);
      app.npmrc.addConfig('//npm.pkg.github.com/:_authToken', '${GITHUB_TOKEN}');
      app.npmrc.addConfig('//npm.pkg.github.com/:always-auth', 'true');
    }

    // Create jobs for synthesizing, asset uploading, and deployment.
    this.createSynth();

    this.createAssetUpload();

    for (const stage of options.stages) {
      this.createDeployment(stage);
    }
    for (const stage of (options.independentStages ?? [])) {
      this.createIndependentDeployment(stage);
    }
  }

  /** the type of engine this implementation of CDKPipeline is for */
  public engineType(): PipelineEngine {
    return PipelineEngine.GITHUB;
  }

  /**
   * Creates a synthesis job for the pipeline using GitHub Actions.
   */
  private createSynth(): void {
    const steps: PipelineStep[] = [];

    if (this.options.iamRoleArns?.synth) {
      steps.push(new AwsAssumeRoleStep(this.project, {
        roleArn: this.options.iamRoleArns.synth,
        sessionName: 'GitHubAction',
      }));
    }
    steps.push(...this.options.preInstallSteps ?? []);
    steps.push(new SimpleCommandStep(this.project, this.renderInstallCommands()));

    steps.push(...this.options.preSynthSteps ?? []);
    steps.push(new SimpleCommandStep(this.project, this.renderSynthCommands()));
    steps.push(...this.options.postSynthSteps ?? []);

    steps.push(new UploadArtifactStep(this.project, {
      name: 'cloud-assembly',
      path: `${this.app.cdkConfig.cdkout}/`,
    }));

    const githubSteps = steps.map(s => s.toGithub());

    this.deploymentWorkflow.addJob('synth', {
      name: 'Synth CDK application',
      runsOn: this.options.runnerTags ?? DEFAULT_RUNNER_TAGS,
      env: {
        CI: 'true',
        ...githubSteps.reduce((acc, step) => ({ ...acc, ...step.env }), {}),
      },
      needs: [...githubSteps.flatMap(s => s.needs)],
      permissions: {
        idToken: JobPermission.WRITE,
        contents: JobPermission.READ,
        ...this.useGithubPackages && {
          packages: JobPermission.READ,
        },
      },
      steps: [
        {
          name: 'Checkout',
          uses: 'actions/checkout@v4',
        },
        ...githubSteps.flatMap(s => s.steps),
      ],
    });
  }

  /**
   * Creates a job to upload assets to AWS as part of the pipeline.
   */
  public createAssetUpload(): void {
    const steps = [
      new SimpleCommandStep(this.project, ['git config --global user.name "github-actions" && git config --global user.email "github-actions@github.com"']),
      new AwsAssumeRoleStep(this.project, {
        roleArn: this.options.iamRoleArns?.assetPublishing ?? this.options.iamRoleArns?.default!,
        region: 'us-east-1',
      }),
      new DownloadArtifactStep(this.project, {
        name: 'cloud-assembly',
        path: `${this.app.cdkConfig.cdkout}/`,
      }),
      ...this.options.preInstallSteps ?? [],
      new SimpleCommandStep(this.project, this.renderInstallCommands()),
      new SimpleCommandStep(this.project, this.getAssetUploadCommands(this.needsVersionedArtifacts)),
    ].map(s => s.toGithub());

    this.deploymentWorkflow.addJob('assetUpload', {
      name: 'Publish assets to AWS',
      needs: ['synth', ...steps.flatMap(s => s.needs)],
      runsOn: this.options.runnerTags ?? DEFAULT_RUNNER_TAGS,
      env: {
        CI: 'true',
        ...steps.reduce((acc, step) => ({ ...acc, ...step.env }), {}),
      },
      permissions: {
        idToken: JobPermission.WRITE,
        contents: this.needsVersionedArtifacts ? JobPermission.WRITE : JobPermission.READ,
        ...this.useGithubPackages && {
          packages: JobPermission.WRITE,
        },
      },
      steps: [
        {
          name: 'Checkout',
          uses: 'actions/checkout@v4',
          with: {
            'fetch-depth': 0,
          },
        },
        ...steps.flatMap(s => s.steps),
      ],
    });
  }

  /**
   * Creates a job to deploy the CDK application to AWS.
   * @param stage - The deployment stage to create.
   */
  public createDeployment(stage: DeploymentStage): void {

    if (stage.manualApproval === true) {
      const steps = [
        new AwsAssumeRoleStep(this.project, {
          roleArn: this.options.iamRoleArns?.deployment?.[stage.name] ?? this.options.iamRoleArns?.default!,
          region: stage.env.region,
        }),
        ...this.options.preInstallSteps ?? [],
        new SimpleCommandStep(this.project, this.renderInstallCommands()),
        new SimpleCommandStep(this.project, this.renderInstallPackageCommands(`${this.options.pkgNamespace}/${this.app.name}@\${{github.event.inputs.version}}`)),
        new SimpleCommandStep(this.project, [`mv ./node_modules/${this.options.pkgNamespace}/${this.app.name} ${this.app.cdkConfig.cdkout}`]),
        new SimpleCommandStep(this.project, this.renderDeployCommands(stage.name)),
        new UploadArtifactStep(this.project, {
          name: `cdk-outputs-${stage.name}`,
          path: `cdk-outputs-${stage.name}.json`,
        }),
      ].map(s => s.toGithub());

      // Create new workflow for deployment
      const stageWorkflow = this.app.github!.addWorkflow(`release-${stage.name}`);
      stageWorkflow.on({
        workflowDispatch: {
          inputs: {
            version: {
              description: 'Package version',
              required: true,
            },
          },
        },
      });
      stageWorkflow.addJob('deploy', {
        name: `Release stage ${stage.name} to AWS`,
        needs: steps.flatMap(s => s.needs),
        runsOn: this.options.runnerTags ?? DEFAULT_RUNNER_TAGS,
        env: {
          CI: 'true',
          ...steps.reduce((acc, step) => ({ ...acc, ...step.env }), {}),
        },
        permissions: {
          idToken: JobPermission.WRITE,
          contents: JobPermission.READ,
          ...this.useGithubPackages && {
            packages: JobPermission.READ,
          },
        },
        steps: [
          {
            name: 'Checkout',
            uses: 'actions/checkout@v4',
          },
          ...steps.flatMap(s => s.steps),
        ],
      });

    } else {

      const steps = [
        new AwsAssumeRoleStep(this.project, {
          roleArn: this.options.iamRoleArns?.deployment?.[stage.name] ?? this.options.iamRoleArns?.default!,
          region: stage.env.region,
        }),
        new DownloadArtifactStep(this.project, {
          name: 'cloud-assembly',
          path: `${this.app.cdkConfig.cdkout}/`,
        }),
        ...this.options.preInstallSteps ?? [],
        new SimpleCommandStep(this.project, this.renderInstallCommands()),
        new SimpleCommandStep(this.project, this.renderDeployCommands(stage.name)),
        new UploadArtifactStep(this.project, {
          name: `cdk-outputs-${stage.name}`,
          path: `cdk-outputs-${stage.name}.json`,
        }),
      ].map(s => s.toGithub());

      // Add deployment to CI/CD workflow
      this.deploymentWorkflow.addJob(`deploy-${stage.name}`, {
        name: `Deploy stage ${stage.name} to AWS`,
        needs: ['assetUpload', ...steps.flatMap(s => s.needs), ...(this.deploymentStages.length > 0 ? [`deploy-${this.deploymentStages.at(-1)!}`] : [])],
        runsOn: this.options.runnerTags ?? DEFAULT_RUNNER_TAGS,
        env: {
          CI: 'true',
          ...steps.reduce((acc, step) => ({ ...acc, ...step.env }), {}),
        },
        permissions: {
          idToken: JobPermission.WRITE,
          contents: JobPermission.READ,
          ...this.useGithubPackages && {
            packages: JobPermission.READ,
          },
        },
        steps: [
          {
            name: 'Checkout',
            uses: 'actions/checkout@v4',
          },
          ...steps.flatMap(s => s.steps),
        ],
      });
      this.deploymentStages.push(stage.name);
    }
  }

  /**
   * Creates a job to deploy the CDK application to AWS.
   * @param stage - The independent stage to create.
   */
  public createIndependentDeployment(stage: IndependentStage): void {
    const steps = [
      new AwsAssumeRoleStep(this.project, {
        roleArn: this.options.iamRoleArns?.deployment?.[stage.name] ?? this.options.iamRoleArns?.default!,
        region: stage.env.region,
      }),
      ...this.options.preInstallSteps ?? [],
      new SimpleCommandStep(this.project, this.renderInstallCommands()),

      ...this.options.preSynthSteps ?? [],
      new SimpleCommandStep(this.project, this.renderSynthCommands()),
      ...this.options.postSynthSteps ?? [],

      new SimpleCommandStep(this.project, this.renderDiffCommands(stage.name)),
      ...stage.postDiffSteps ?? [],

      new SimpleCommandStep(this.project, this.renderDeployCommands(stage.name)),
      ...stage.postDeploySteps ?? [],

      new UploadArtifactStep(this.project, {
        name: `cdk-outputs-${stage.name}`,
        path: `cdk-outputs-${stage.name}.json`,
      }),
    ].map(s => s.toGithub());

    // Create new workflow for deployment
    const stageWorkflow = this.app.github!.addWorkflow(`deploy-${stage.name}`);
    stageWorkflow.on({
      workflowDispatch: {},
    });
    stageWorkflow.addJob('deploy', {
      name: `Release stage ${stage.name} to AWS`,
      needs: steps.flatMap(s => s.needs),
      runsOn: this.options.runnerTags ?? DEFAULT_RUNNER_TAGS,
      env: {
        CI: 'true',
        ...steps.reduce((acc, step) => ({ ...acc, ...step.env }), {}),
      },
      permissions: {
        idToken: JobPermission.WRITE,
        contents: JobPermission.READ,
      },
      steps: [
        {
          name: 'Checkout',
          uses: 'actions/checkout@v4',
        },
        ...steps.flatMap(s => s.steps),
      ],
    });

  }
}
