import { Component } from 'projen';
import { GitHubProject, GithubWorkflow } from 'projen/lib/github';
import { JobPermission, JobStep } from 'projen/lib/github/workflows-model';

export interface GithubWinglangPipelineOptions {
  readonly stages: string[];
  readonly target: 'tf-aws';
  readonly wingEntryFile: string;
  readonly iamRoleArnPerStage: { [stage: string]: string };
  readonly awsRegionPerStage: { [stage: string]: string };
}

export class GithubWinglangPipeline extends Component {
  readonly worklfow: GithubWorkflow;
  private readonly currentStages: string[] = [];
  constructor(scope: GitHubProject, protected options: GithubWinglangPipelineOptions) {
    super(scope);

    this.worklfow = scope.github!.addWorkflow('deploy');

    this.worklfow.on({
      push: {
        branches: ['main'],
      },
      workflowDispatch: {},
    });

    this.createCompile();

    for (const stage of options.stages) {
      if (this.options.target === 'tf-aws') {
        this.createTerraformDeploy(stage);
      } else {
        throw new Error(`Unsupported target: ${this.options.target}`);
      }
    }
  }
  createTerraformDeploy(stage: string) {
    const jobSteps: JobStep[] = [
      {
        name: 'Download Wing compile artifact',
        uses: 'actions/download-artifact@v4',
        with: {
          name: 'wing-compile-artifact',
          path: 'target',
        },
      },
      {
        uses: 'aws-actions/configure-aws-credentials@v4',
        with: {
          'aws-region': this.options.awsRegionPerStage[stage],
          'role-to-assume': this.options.iamRoleArnPerStage[stage],
          'role-session-name': `DeploySession-${stage}`,
        },
      },
      {
        name: 'Terrform Init',
        run: 'terraform init',
        workingDirectory: `target/${this.options.wingEntryFile.split('.w')[0]}.tfaws`,
      },
      {
        name: 'Deploy',
        run: 'terraform apply -auto-approve',
        workingDirectory: `target/${this.options.wingEntryFile.split('.w')[0]}.tfaws`,
      },
    ];

    this.worklfow.addJob(`deploy-${stage}`, {
      runsOn: ['ubuntu-latest'],
      needs: ['compile', ...this.currentStages.map(s => `deploy-${s}`)],
      permissions: {
        contents: JobPermission.READ,
        idToken: JobPermission.WRITE,
      },
      steps: jobSteps,
    });
    this.currentStages.push(stage);
  }

  private createCompile() {
    const jobSteps: JobStep[] = [
      {
        name: 'Checkout',
        uses: 'actions/checkout@v4',
      },
      {
        name: 'Install Winglang CLI',
        run: 'npm install -g winglang',
      },
      {
        name: 'Build',
        run: `wing compile - t ${this.options.target} ${this.options.wingEntryFile}`,
      },
      {
        name: 'Upload Wing compile artifact',
        uses: 'actions/upload-artifact@v4',
        with: {
          name: 'wing-compile-artifact',
          path: 'target',
        },
      },
    ];

    this.worklfow.addJob('compile', {
      runsOn: ['ubuntu-latest'],
      permissions: {
        contents: JobPermission.READ,
      },
      steps: jobSteps,
    });

  }
}
