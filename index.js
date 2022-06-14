const core = require('@actions/core')
const github = require('@actions/github')
const slugify = require('./slugify')

const defaultShaLength = 7

const parseLengthInput = s => {
  const parsed = parseInt(s, 10)
  if (isNaN(parsed)) {
    return defaultShaLength
  }
  return parsed
}

try {
  const shaLength = parseLengthInput(core.getInput('sha_length'))

  console.log(`event_name: >${github.context.eventName}<`)

  if (github.context.eventName === 'pull_request') {
    const pullRequest = github.context.payload.pull_request
    const branch = slugify(pullRequest.head.ref)
    const sha = pullRequest.head.sha.slice(0, shaLength)
    core.setOutput('branch', branch)
    core.setOutput('sha', sha)
    console.log(`Output variables set for pull_request event: ${branch}-${sha}`)
  } else if (github.context.eventName === 'push') {
    const parts = github.context.ref.split('/')
    const branch = slugify(parts[parts.length - 1])
    const sha = github.context.sha.slice(0, shaLength)
    core.setOutput('branch', branch)
    core.setOutput('sha', sha)
    console.log(`Output variables set for push event: ${branch}-${sha}`)
  } else if (github.context.eventName.startsWith('workflow_dispatch')) {
      const parts = github.context.ref.split('/')
      const branch = slugify(parts[parts.length - 1])
      const sha = github.context.sha.slice(0, shaLength)
      core.setOutput('branch', branch)
      core.setOutput('sha', sha)
      console.log(`Output variables set for push event: ${branch}-${sha}`)
  } else {
    core.setFailed(`No implementation for event_name: ${github.context.eventName}`)
  }
} catch (error) {
  core.setFailed(error.message)
}
