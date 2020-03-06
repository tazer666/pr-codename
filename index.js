const core = require('@actions/core');
const github = require('@actions/github');
const moniker = require('moniker');

try {
    core.debug(`starting codename generator...`)

    const pr = github.context.payload.pull_request;
    if (!pr) {
      core.setFailed('github.context.payload.pull_request does not exist');
      return;
    }

    // Get input parameters.
    const codename = moniker.choose();
    const message = 'PR codename: ' + moniker.choose();
    core.debug(`codename generated: ${message}`);

    // Create a GitHub client.
    const client = new github.GitHub(core.getInput('token'));

    // Get owner and repo from context
    const owner = github.context.repo.owner;
    const repo = github.context.repo.repo;


    // Create a comment on PR
    const response = client.issues.createComment({
      owner,
      repo,
      issue_number: pr.number,
      body: message
    });
    core.debug('codename comment posted');
} catch (error) {
  core.setFailed(error.message);
}