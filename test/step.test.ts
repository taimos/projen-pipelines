import { Project } from 'projen';
import { SimpleCommandStep } from '../src';

test('SimpleCommandStep works correctly', () => {
  const project = new Project({ name: 'test-project' });

  const step = new SimpleCommandStep(project, ['echo "Hello World"', 'echo 42']);
  expect(step.toBash()).toMatchSnapshot();
  expect(step.toGithub()).toMatchSnapshot();
  expect(step.toGitlab()).toMatchSnapshot();
});