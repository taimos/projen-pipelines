
/**
 * The CI/CD tooling used to run your pipeline.
 * The component will render workflows for the given system
 */
export enum PipelineEngine {
  /** Create GitHub actions */
  GITHUB,
  /** Create a .gitlab-ci.yaml file */
  GITLAB,
  // /** Create AWS CodeCatalyst workflows */
  // CODE_CATALYST,
  /** Create bash scripts */
  BASH,
}