import { awscdk, gitlab } from 'projen';
import { CDKPipeline, CDKPipelineOptions, DeploymentStage } from './base';


export interface GitlabCDKPipelineOptions extends CDKPipelineOptions {
  readonly iamRoleArns: {
    readonly default?: string;
    readonly synth?: string;
    readonly assetPublishing?: string;
    readonly deployment?: { [stage: string]: string };
  };
  // readonly publishedCloudAssemblies?: boolean;
  readonly image?: string;
}

export class GitlabCDKPipeline extends CDKPipeline {

  public readonly needsVersionedArtifacts: boolean;
  public readonly jobImage: string;
  public readonly config: gitlab.GitlabConfiguration;

  private deploymentStages: string[] = [];

  constructor(app: awscdk.AwsCdkTypeScriptApp, private options: GitlabCDKPipelineOptions) {
    super(app, options);

    // TODO use existing config if possible
    this.config = new gitlab.GitlabConfiguration(app, {
      stages: [],
      jobs: {},
    });

    this.needsVersionedArtifacts = false; // options.publishedCloudAssemblies ?? false;
    this.jobImage = options.image ?? 'image: jsii/superchain:1-buster-slim-node18';

    this.setupSnippets();

    this.createSynth();

    this.createAssetUpload();

    for (const stage of options.stages) {
      this.createDeployment(stage);
    }
  }

  protected setupSnippets() {
    this.config.addJobs({
      '.artifacts_cdk': {
        artifacts: {
          when: gitlab.CacheWhen.ON_SUCCESS,
          expireIn: '30 days',
          name: 'CDK Assembly - $CI_JOB_NAME-$CI_COMMIT_REF_SLUG',
          untracked: false,
          paths: ['cdk.out'],
        },
      },
      '.artifacts_cdkdeploy': {
        artifacts: {
          when: gitlab.CacheWhen.ON_SUCCESS,
          expireIn: '30 days',
          name: 'CDK Outputs - $CI_JOB_NAME-$CI_COMMIT_REF_SLUG',
          untracked: false,
          paths: ['cdk-outputs-*.json'],
        },
      },
      '.aws_base': {
        image: { name: this.jobImage },
        idTokens: {
          AWS_TOKEN: {
            aud: 'https://sts.amazonaws.com',
          },
        },
        variables: {
          CI: 'true',
          // NPM_REGISTRY: 'xxx'
        },
        beforeScript: [
          `check_variables_defined() {
  for var in "$@"; do
    if [ -z "$(eval "echo \\$$var")" ]; then
      log_fatal "\${var} not defined";
    fi
  done
}

awslogin() {
  roleArn=\${1: -\${AWS_ROLE_ARN}}
  check_variables_defined roleArn AWS_TOKEN
  export $(printf "AWS_ACCESS_KEY_ID=%s AWS_SECRET_ACCESS_KEY=%s AWS_SESSION_TOKEN=%s" $(aws sts assume-role-with-web-identity --role-arn \${roleArn} --role-session-name "GitLabRunner-\${CI_PROJECT_ID}-\${CI_PIPELINE_ID}" --web-identity-token \${AWS_TOKEN} --duration-seconds 3600 --query 'Credentials.[AccessKeyId,SecretAccessKey,SessionToken]' --output text))
  # TODO CODE ARTIFACT
}
`,
        ],
      },
    });
  }

  protected createSynth(): void {
    const script = ['echo "Running CDK synth"'];
    if (this.options.iamRoleArns?.synth) {
      script.push(`awslogin '${this.options.iamRoleArns.synth}'`);
    }
    script.push(...this.getSynthCommands());

    this.config.addStages('synth');
    this.config.addJobs({
      synth: {
        extends: ['.aws_base', '.artifacts_cdk'],
        stage: 'synth',
        script,
      },
    });
  }

  protected createAssetUpload(): void {
    const script = ['echo "Publish assets to AWS"'];
    if (this.options.iamRoleArns?.assetPublishing) {
      script.push(`awslogin '${this.options.iamRoleArns.assetPublishing}'`);
    }
    script.push(...this.getAssetUploadCommands(this.needsVersionedArtifacts));

    this.config.addStages('publish_assets');
    this.config.addJobs({
      publish_assets: {
        extends: ['.aws_base'],
        stage: 'publish_assets',
        needs: [{ job: 'synth', artifacts: true }],
        script,
      },
    });
  }

  protected createDeployment(stage: DeploymentStage): void {
    const script = [];
    script.push(`awslogin '${this.options.iamRoleArns?.deployment?.[stage.name] ?? this.options.iamRoleArns?.default}'`);
    script.push(...this.getInstallCommands());

    this.config.addStages(stage.name);
    this.config.addJobs({
      [`diff-${stage.name}`]: {
        extends: ['.aws_base'],
        stage: stage.name,
        only: {
          refs: ['main'],
        },
        needs: [
          { job: 'synth', artifacts: true },
          { job: 'publish_assets' },
        ],
        script: [
          `awslogin '${this.options.iamRoleArns?.deployment?.[stage.name] ?? this.options.iamRoleArns?.default}'`,
          ...this.getInstallCommands(),
          ...this.getDiffCommands(stage.name),
        ],
      },
      [`deploy-${stage.name}`]: {
        extends: ['.aws_base', '.artifacts_cdkdeploy'],
        stage: stage.name,
        ...stage.manualApproval && {
          when: gitlab.JobWhen.MANUAL,
        },
        only: {
          refs: ['main'],
        },
        needs: [
          { job: 'synth', artifacts: true },
          { job: 'publish_assets' },
          { job: `diff-${stage.name}` },
        ],
        script: [
          `awslogin '${this.options.iamRoleArns?.deployment?.[stage.name] ?? this.options.iamRoleArns?.default}'`,
          ...this.getInstallCommands(),
          ...this.getDeployCommands(stage.name),
        ],
      },
    });
    this.deploymentStages.push(stage.name);
  }

}

