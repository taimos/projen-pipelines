import { awscdk } from 'projen';
import { GithubWorkflow } from 'projen/lib/github';
import { JobPermission, JobStep } from 'projen/lib/github/workflows-model';
import { CDKPipeline, CDKPipelineOptions, DeploymentStage } from './base';
import { PipelineEngine } from '../engine';

export interface GithubIamRoleConfig {
  readonly default?: string;
  readonly synth?: string;
  readonly assetPublishing?: string;
  readonly deployment?: { [stage: string]: string };
}

export interface GithubCDKPipelineOptions extends CDKPipelineOptions {
  readonly iamRoleArns: GithubIamRoleConfig;
}

export class GithubCDKPipeline extends CDKPipeline {

  public readonly needsVersionedArtifacts: boolean;

  private deploymentWorkflow: GithubWorkflow;
  private deploymentStages: string[] = [];

  constructor(app: awscdk.AwsCdkTypeScriptApp, private options: GithubCDKPipelineOptions) {
    super(app, options);

    this.deploymentWorkflow = this.app.github!.addWorkflow('deploy');
    this.deploymentWorkflow.on({
      push: {
        branches: [this.branchName],
      },
      workflowDispatch: {},
    });

    this.needsVersionedArtifacts = this.options.stages.find(s => s.manualApproval === true) !== undefined;

    this.createSynth();

    this.createAssetUpload();

    for (const stage of options.stages) {
      this.createDeployment(stage);
    }
  }

  public engineType(): PipelineEngine {
    return PipelineEngine.GITHUB;
  }

  private createSynth(): void {
    const steps: JobStep[] = [{
      name: 'Checkout',
      uses: 'actions/checkout@v4',
    }];

    if (this.options.iamRoleArns?.synth) {
      steps.push({
        name: 'AWS Credentials',
        uses: 'aws-actions/configure-aws-credentials@master',
        with: {
          'role-to-assume': this.options.iamRoleArns.synth,
          'role-session-name': 'GitHubAction',
          'aws-region': 'us-east-1',
        },
      });
    }
    const preInstallSteps = (this.options.preInstallSteps ?? []).map(s => s.toGithub());
    const preSynthSteps = (this.options.preSynthSteps ?? []).map(s => s.toGithub());
    const postSynthSteps = (this.options.postSynthSteps ?? []).map(s => s.toGithub());

    steps.push(...preInstallSteps.flatMap(s => s.steps));
    steps.push(...this.renderInstallCommands().map(cmd => ({
      run: cmd,
    })));

    steps.push(...preSynthSteps.flatMap(s => s.steps));
    steps.push(...this.renderSynthCommands().map(cmd => ({
      run: cmd,
    })));
    steps.push(...postSynthSteps.flatMap(s => s.steps));

    steps.push({
      uses: 'actions/upload-artifact@v4',
      with: {
        name: 'cloud-assembly',
        path: `${this.app.cdkConfig.cdkout}/`,
      },
    });

    this.deploymentWorkflow.addJob('synth', {
      name: 'Synth CDK application',
      runsOn: ['ubuntu-latest'],
      env: {
        CI: 'true',
      },
      needs: [...preInstallSteps.flatMap(s => s.needs), ...preSynthSteps.flatMap(s => s.needs), ...postSynthSteps.flatMap(s => s.needs)],
      permissions: { idToken: JobPermission.WRITE, contents: JobPermission.READ },
      steps,
    });
  }

  public createAssetUpload(): void {
    const preInstallSteps = (this.options.preInstallSteps ?? []).map(s => s.toGithub());

    this.deploymentWorkflow.addJob('assetUpload', {
      name: 'Publish assets to AWS',
      needs: ['synth', ...preInstallSteps.flatMap(s => s.needs)],
      runsOn: ['ubuntu-latest'],
      env: {
        CI: 'true',
      },
      permissions: { idToken: JobPermission.WRITE, contents: this.needsVersionedArtifacts ? JobPermission.WRITE : JobPermission.READ },
      steps: [{
        name: 'Checkout',
        uses: 'actions/checkout@v4',
        with: {
          'fetch-depth': 0,
        },
      }, {
        name: 'Setup GIT identity',
        run: 'git config --global user.name "github-actions" && git config --global user.email "github-actions@github.com"',
      }, {
        name: 'AWS Credentials',
        uses: 'aws-actions/configure-aws-credentials@master',
        with: {
          'role-to-assume': this.options.iamRoleArns?.assetPublishing ?? this.options.iamRoleArns?.default,
          'role-session-name': 'GitHubAction',
          'aws-region': 'us-east-1',
        },
      }, {
        uses: 'actions/download-artifact@v4',
        with: {
          name: 'cloud-assembly',
          path: `${this.app.cdkConfig.cdkout}/`,
        },
      },
      ...preInstallSteps.flatMap(s => s.steps),
      ...this.renderInstallCommands().map(cmd => ({
        run: cmd,
      })),
      ...this.getAssetUploadCommands(this.needsVersionedArtifacts).map(cmd => ({
        run: cmd,
      }))],
    });
  }

  public createDeployment(stage: DeploymentStage): void {
    const preInstallSteps = (this.options.preInstallSteps ?? []).map(s => s.toGithub());

    if (stage.manualApproval === true) {
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
        needs: preInstallSteps.flatMap(s => s.needs),
        runsOn: ['ubuntu-latest'],
        env: {
          CI: 'true',
        },
        permissions: { idToken: JobPermission.WRITE, contents: JobPermission.READ },
        steps: [{
          name: 'Checkout',
          uses: 'actions/checkout@v4',
        }, {
          name: 'AWS Credentials',
          uses: 'aws-actions/configure-aws-credentials@master',
          with: {
            'role-to-assume': this.options.iamRoleArns?.deployment?.[stage.name] ?? this.options.iamRoleArns?.default,
            'role-session-name': 'GitHubAction',
            'aws-region': stage.env.region,
          },
        },
        ...preInstallSteps.flatMap(s => s.steps),
        ...this.renderInstallCommands().map(cmd => ({
          run: cmd,
        })),
        ...this.renderInstallPackageCommands(`${this.options.pkgNamespace}/${this.app.name}@\${{github.event.inputs.version}}`).map(cmd => ({
          run: cmd,
        })),
        {
          run: `mv ./node_modules/${this.options.pkgNamespace}/${this.app.name} ${this.app.cdkConfig.cdkout}`,
        },
        ...this.renderDeployCommands(stage.name).map(cmd => ({
          run: cmd,
        })),
        {
          uses: 'actions/upload-artifact@v3',
          with: {
            name: `cdk-outputs-${stage.name}`,
            path: `cdk-outputs-${stage.name}.json`,
          },
        }],
      });

    } else {
      // Add deployment to CI/CD workflow
      this.deploymentWorkflow.addJob(`deploy-${stage.name}`, {
        name: `Deploy stage ${stage.name} to AWS`,
        needs: ['assetUpload', ...preInstallSteps.flatMap(s => s.needs), ...(this.deploymentStages.length > 0 ? [`deploy-${this.deploymentStages.at(-1)!}`] : [])],
        runsOn: ['ubuntu-latest'],
        env: {
          CI: 'true',
        },
        permissions: { idToken: JobPermission.WRITE, contents: JobPermission.READ },
        steps: [{
          name: 'Checkout',
          uses: 'actions/checkout@v4',
        }, {
          name: 'AWS Credentials',
          uses: 'aws-actions/configure-aws-credentials@master',
          with: {
            'role-to-assume': this.options.iamRoleArns?.deployment?.[stage.name] ?? this.options.iamRoleArns?.default,
            'role-session-name': 'GitHubAction',
            'aws-region': stage.env.region,
          },
        }, {
          uses: 'actions/download-artifact@v4',
          with: {
            name: 'cloud-assembly',
            path: `${this.app.cdkConfig.cdkout}/`,
          },
        },
        ...preInstallSteps.flatMap(s => s.steps),
        ...this.renderInstallCommands().map(cmd => ({
          run: cmd,
        })),
        ...this.renderDeployCommands(stage.name).map(cmd => ({
          run: cmd,
        })),
        {
          uses: 'actions/upload-artifact@v3',
          with: {
            name: `cdk-outputs-${stage.name}`,
            path: `cdk-outputs-${stage.name}.json`,
          },
        }],
      });
      this.deploymentStages.push(stage.name);
    }
  }
}
