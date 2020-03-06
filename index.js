const core = require('@actions/core');
const github = require('@actions/github');
const moniker = require('moniker');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  console.log(moniker.choose())
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)

  github.context.payload.pull_request.body += "asdf"

    const pr = github.context.payload.pull_request
    if (!pr) {
      core.setFailed('github.context.payload.pull_request does not exist')
      return
    }
    token = core.getInput('token');

    // Get input parameters.
    const token = core.getInput('repo-token')
    const message = moniker.choose();
    core.debug(`codename generated: ${message}`)

    // Create a GitHub client.
    const client = new github.GitHub(token)

    // Get owner and repo from context
    const owner = github.context.repo.owner
    const repo = github.context.repo.repo


    // Create a comment on PR
    // https://octokit.github.io/rest.js/#octokit-routes-issues-create-comment
    const response = client.issues.createComment({
      owner,
      repo,
      // eslint-disable-next-line @typescript-eslint/camelcase
      issue_number: pr.number,
      body: message
    });
    core.debug(`created comment URL: ${response.data.html_url}`)

    core.setOutput('comment-url', response.data.html_url)

} catch (error) {
  core.setFailed(error.message);
}