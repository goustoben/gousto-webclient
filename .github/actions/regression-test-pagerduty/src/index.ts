import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  const ctx = github.context

  core.info(`Github context: ${JSON.stringify(ctx, null, 4)}`)

  // On webhook event, get artifact from Circle

  // If pass, crack on

  // If fail:

  // Get code ownership from test file

  // Raise incident on pagerduty
}

run()
