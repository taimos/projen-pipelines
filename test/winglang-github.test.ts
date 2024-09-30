import { GitHubProject } from 'projen/lib/github';
import { synthSnapshot } from 'projen/lib/util/synth';
import { GithubWinglangPipeline } from '../src';

test('Winglang Github snapshot', () => {
  const p = new GitHubProject({
    name: 'testapp',
  });

  new GithubWinglangPipeline(p, {
    stages: ['dev', 'prod'],
    iamRoleArnPerStage: {
      dev: 'devRole',
      prod: 'prodRole',
    },
    awsRegionPerStage: {
      dev: 'eu-central-1',
      prod: 'eu-central-1',
    },
    target: 'tf-aws',
    wingEntryFile: 'main.w',
  });

  const snapshot = synthSnapshot(p);
  expect(snapshot['.github/workflows/deploy.yml']).toMatchSnapshot();
});

