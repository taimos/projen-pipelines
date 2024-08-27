import { awscdk, gitlab } from 'projen';
import { CDKPipeline, CDKPipelineOptions, DeploymentStage, IndependentStage } from './base';
import { PipelineEngine } from '../engine';
import { PipelineStep, SimpleCommandStep } from '../steps';
import { AwsAssumeRoleStep } from '../steps/aws-assume-role.step';

/**
 * Configuration for IAM roles used within the GitLab CI/CD pipeline for various stages.
 * Allows specifying different IAM roles for synthesis, asset publishing, and deployment stages,
 * providing granular control over permissions.
 */
export interface GitlabIamRoleConfig {
  /** Default IAM role ARN used if specific stage role is not provided. */
  readonly default?: string;
  /** IAM role ARN for the synthesis stage. */
  readonly synth?: string;
  /** IAM role ARN for the asset publishing step. */
  readonly assetPublishing?: string;
  /** IAM role ARN for the asset publishing step for a specific stage. */
  readonly assetPublishingPerStage?: { [stage: string]: string };
  /** A map of stage names to IAM role ARNs for the diff operation. */
  readonly diff?: { [stage: string]: string };
  /** A map of stage names to IAM role ARNs for the deployment operation. */
  readonly deployment?: { [stage: string]: string };
}

/**
 * Configuration for GitLab runner tags used within the CI/CD pipeline for various stages.
 * This allows for specifying different runners based on the tags for different stages of the pipeline.
 */
export interface GitlabRunnerTags {
  /** Default runner tags used if specific stage tags are not provided. */
  readonly default?: string[];
  /** Runner tags for the synthesis stage. */
  readonly synth?: string[];
  /** Runner tags for the asset publishing stage. */
  readonly assetPublishing?: string[];
  /** A map of stage names to runner tags for the diff operation. */
  readonly diff?: { [stage: string]: string[] };
  /** A map of stage names to runner tags for the deployment operation. */
  readonly deployment?: { [stage: string]: string[] };
}

/**
 * Options for configuring the GitLab CDK pipeline, extending the base CDK pipeline options.
 */
export interface GitlabCDKPipelineOptions extends CDKPipelineOptions {
  /** IAM role ARNs configuration for the pipeline. */
  readonly iamRoleArns: GitlabIamRoleConfig;
  /** Runner tags configuration for the pipeline. */
  readonly runnerTags?: GitlabRunnerTags;
  /** The Docker image to use for running the pipeline jobs. */
  readonly image?: string;

  // readonly publishedCloudAssemblies?: boolean;
}

/**
 * The GitlabCDKPipeline class extends CDKPipeline to provide a way to configure and execute
 * AWS CDK deployment pipelines within GitLab CI/CD environments. It integrates IAM role management,
 * runner configuration, and defines stages and jobs for the deployment workflow.
 */
export class GitlabCDKPipeline extends CDKPipeline {

  /** Indicates if versioned artifacts are required. Currently set to false  */
  public readonly needsVersionedArtifacts: boolean;

  /** The Docker image used for pipeline jobs. Defaults to a specified image or a default value. */
  public readonly jobImage: string;

  /** GitLab CI/CD configuration object. */
  public readonly config: gitlab.GitlabConfiguration;

  /** List of deployment stages as strings. */
  private deploymentStages: string[] = [];

  /**
   * Constructs an instance of GitlabCDKPipeline, initializing the GitLab CI/CD configuration
   * and setting up the necessary stages and jobs for AWS CDK deployment.
   *
   * @param {awscdk.AwsCdkTypeScriptApp} app - The AWS CDK app associated with the pipeline.
   * @param {GitlabCDKPipelineOptions} options - Configuration options for the pipeline.
   */
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

    for (const stage of (options.independentStages ?? [])) {
      this.createIndependentDeployment(stage);
    }
  }

  /**
   * Sets up base job snippets for artifact handling and AWS configuration.
   * This method defines reusable job configurations to be extended by specific pipeline jobs,
   * facilitating artifact caching and AWS authentication setup.
   */
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
  sessionName=\${2:-GitLabRunner-\${CI_PROJECT_ID}-\${CI_PIPELINE_ID}}
  check_variables_defined roleArn AWS_TOKEN
  export $(printf "AWS_ACCESS_KEY_ID=%s AWS_SECRET_ACCESS_KEY=%s AWS_SESSION_TOKEN=%s" $(aws sts assume-role-with-web-identity --role-arn \${roleArn} --role-session-name "\${sessionName}" --web-identity-token \${AWS_TOKEN} --duration-seconds 3600 --query 'Credentials.[AccessKeyId,SecretAccessKey,SessionToken]' --output text))
  # TODO CODE ARTIFACT
}
`,
        ],
      },
    });
  }

  /**
   * Creates the 'synth' stage of the pipeline to synthesize AWS CDK applications.
   * This method configures the job to execute CDK synthesis, applying the appropriate IAM role
   * for AWS commands and specifying runner tags for job execution. The synthesized outputs are
   * configured to be cached as artifacts.
   */
  protected createSynth(): void {
    const steps: PipelineStep[] = [];

    if (this.options.iamRoleArns?.synth) {
      steps.push(new AwsAssumeRoleStep(this.project, {
        roleArn: this.options.iamRoleArns.synth,
      }));
    }
    steps.push(...this.options.preInstallSteps ?? []);
    steps.push(new SimpleCommandStep(this.project, this.renderInstallCommands()));

    steps.push(...this.options.preSynthSteps ?? []);
    steps.push(new SimpleCommandStep(this.project, this.renderSynthCommands()));
    steps.push(...this.options.postSynthSteps ?? []);

    const gitlabSteps = steps.map(s => s.toGitlab());

    this.config.addStages('synth');
    this.config.addJobs({
      synth: {
        extends: ['.aws_base', '.artifacts_cdk', ...gitlabSteps.flatMap(s => s.extensions)],
        needs: gitlabSteps.flatMap(s => s.needs),
        stage: 'synth',
        tags: this.options.runnerTags?.synth ?? this.options.runnerTags?.default,
        script: gitlabSteps.flatMap(s => s.commands),
        variables: gitlabSteps.reduce((acc, step) => ({ ...acc, ...step.env }), {}),
      },
    });
  }

  /**
   * Sets up the asset publishing stage of the pipeline.
   * This method configures a job to upload synthesized assets to AWS, handling IAM role
   * authentication and specifying runner tags. It depends on the successful completion
   * of the 'synth' stage, ensuring assets are only published after successful synthesis.
   */
  protected createAssetUpload(): void {
    const steps = [];

    const globalPublishRole = this.options.iamRoleArns.assetPublishing ?? this.options.iamRoleArns.default;
    if (globalPublishRole) {
      steps.push(new AwsAssumeRoleStep(this.project, {
        roleArn: globalPublishRole,
      }));
    }
    steps.push(...this.options.preInstallSteps ?? []);
    steps.push(new SimpleCommandStep(this.project, this.renderInstallCommands()));

    if (this.options.iamRoleArns.assetPublishingPerStage) {
      const stages = [...this.options.stages, ...this.options.independentStages ?? []];
      for (const stage of stages) {
        steps.push(new AwsAssumeRoleStep(this.project, {
          roleArn: this.options.iamRoleArns.assetPublishingPerStage[stage.name] ?? globalPublishRole,
        }));
        steps.push(new SimpleCommandStep(this.project, this.renderAssetUploadCommands(stage.name)));
      }
    } else {
      steps.push(new SimpleCommandStep(this.project, this.renderAssetUploadCommands()));
    }

    if (this.needsVersionedArtifacts) {
      steps.push(new SimpleCommandStep(this.project, this.renderAssemblyUploadCommands()));
    }

    const gitlabSteps = steps.map(s => s.toGitlab());

    this.config.addStages('publish_assets');
    this.config.addJobs({
      publish_assets: {
        extends: ['.aws_base', ...gitlabSteps.flatMap(s => s.extensions)],
        stage: 'publish_assets',
        tags: this.options.runnerTags?.assetPublishing ?? this.options.runnerTags?.default,
        needs: [{ job: 'synth', artifacts: true }, ...gitlabSteps.flatMap(s => s.needs)],
        script: gitlabSteps.flatMap(s => s.commands),
        variables: gitlabSteps.reduce((acc, step) => ({ ...acc, ...step.env }), {}),
      },
    });
  }

  /**
   * Dynamically creates deployment stages based on the deployment configuration.
   * For each provided deployment stage, this method sets up jobs for 'diff' and 'deploy' actions,
   * applying the correct IAM roles and runner tags. It supports conditional manual approval for
   * deployment stages, providing flexibility in the deployment workflow.
   *
   * @param {DeploymentStage} stage - The deployment stage configuration to set up.
   */
  protected createDeployment(stage: DeploymentStage): void {
    const diffSteps = [
      new AwsAssumeRoleStep(this.project, {
        roleArn: this.options.iamRoleArns?.diff?.[stage.name]
          ?? this.options.iamRoleArns?.deployment?.[stage.name]
          ?? this.options.iamRoleArns?.default!,
      }),
      ...this.options.preInstallSteps ?? [],
      new SimpleCommandStep(this.project, this.renderInstallCommands()),
      new SimpleCommandStep(this.project, this.renderDiffCommands(stage.name)),
    ].map(s => s.toGitlab());


    const deploySteps = [
      new AwsAssumeRoleStep(this.project, {
        roleArn: this.options.iamRoleArns?.deployment?.[stage.name] ?? this.options.iamRoleArns?.default!,
      }),
      ...this.options.preInstallSteps ?? [],
      new SimpleCommandStep(this.project, this.renderInstallCommands()),
      new SimpleCommandStep(this.project, this.renderDeployCommands(stage.name)),
    ].map(s => s.toGitlab());

    this.config.addStages(stage.name);
    this.config.addJobs({
      [`diff-${stage.name}`]: {
        extends: ['.aws_base', ...diffSteps.flatMap(s => s.extensions)],
        stage: stage.name,
        tags: this.options.runnerTags?.diff?.[stage.name] ?? this.options.runnerTags?.deployment?.[stage.name] ?? this.options.runnerTags?.default,
        only: {
          refs: [this.branchName],
        },
        needs: [
          { job: 'synth', artifacts: true },
          { job: 'publish_assets' },
          ...diffSteps.flatMap(s => s.needs),
        ],
        script: diffSteps.flatMap(s => s.commands),
        variables: diffSteps.reduce((acc, step) => ({ ...acc, ...step.env }), {}),
      },
      [`deploy-${stage.name}`]: {
        extends: ['.aws_base', '.artifacts_cdkdeploy', ...deploySteps.flatMap(s => s.extensions)],
        stage: stage.name,
        tags: this.options.runnerTags?.deployment?.[stage.name] ?? this.options.runnerTags?.default,
        ...stage.manualApproval && {
          when: gitlab.JobWhen.MANUAL,
        },
        only: {
          refs: [this.branchName],
        },
        needs: [
          { job: 'synth', artifacts: true },
          { job: 'publish_assets' },
          { job: `diff-${stage.name}` },
          ...deploySteps.flatMap(s => s.needs),
        ],
        script: deploySteps.flatMap(s => s.commands),
        variables: deploySteps.reduce((acc, step) => ({ ...acc, ...step.env }), {}),
      },
    });
    this.deploymentStages.push(stage.name);
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
    ].map(s => s.toGitlab());

    this.config.addStages(stage.name);
    this.config.addJobs({
      [`deploy-${stage.name}`]: {
        extends: ['.aws_base', '.artifacts_cdkdeploy', ...steps.flatMap(s => s.extensions)],
        stage: stage.name,
        tags: this.options.runnerTags?.deployment?.[stage.name] ?? this.options.runnerTags?.default,
        when: gitlab.JobWhen.MANUAL,
        needs: steps.flatMap(s => s.needs),
        script: steps.flatMap(s => s.commands),
        variables: steps.reduce((acc, step) => ({ ...acc, ...step.env }), {}),
      },
    });

  }

  public engineType(): PipelineEngine {
    return PipelineEngine.GITLAB;
  }

}

