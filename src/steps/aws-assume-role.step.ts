import { Project } from 'projen';
import { JobPermission } from 'projen/lib/github/workflows-model';
import { BashStepConfig, CodeCatalystStepConfig, GithubStepConfig, GitlabStepConfig, PipelineStep } from './step';


/**
 * Configuration for an AWS AssumeRoleStep
 */
export interface AwsAssumeRoleStepConfig {
  /** The ARN of the role to assume */
  readonly roleArn: string;
  /** An identifier for the assumed role session */
  readonly sessionName?: string;
  /** The AWS region that should be set */
  readonly region?: string;
}

/**
 * A step that assumes a role in AWS
 */
export class AwsAssumeRoleStep extends PipelineStep {

  constructor(project: Project, private readonly config: AwsAssumeRoleStepConfig) {
    super(project);
  }

  public toGitlab(): GitlabStepConfig {
    return {
      env: {
        ...this.config.region ? { AWS_REGION: this.config.region } : {},
      },
      commands: [
        `awslogin ${this.config.roleArn} ${this.config.sessionName ?? ''}`,
      ],
      extensions: [],
      needs: [],
    };
  }

  public toGithub(): GithubStepConfig {
    return {
      steps: [{
        name: 'AWS Credentials',
        uses: 'aws-actions/configure-aws-credentials@v4',
        with: {
          'role-to-assume': this.config.roleArn,
          'role-session-name': this.config.sessionName ?? 'GitHubAction',
          ...this.config.region ? { 'aws-region': this.config.region } : { 'aws-region': 'us-east-1' },
        },
      }],
      needs: [],
      env: {},
      permissions: {
        idToken: JobPermission.WRITE,
      },
    };
  }

  public toBash(): BashStepConfig {
    return {
      commands: [
        `echo "Login to AWS using role ${this.config.roleArn} for region ${this.config.region ?? 'undefined'}"`,
      ],
    };
  }

  public toCodeCatalyst(): CodeCatalystStepConfig {
    //FIXME use CC environments here
    return {
      commands: [],
      env: {},
      needs: [],
    };
  }

}