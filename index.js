import { getInput, setOutput, setFailed } from '@actions/core'
import { context } from '@actions/github'
import slugify from './slugify.js'

const defaultShaLength = 7

const parseLengthInput = s => {
  const parsed = parseInt(s, 10)
  if (isNaN(parsed)) {
    return defaultShaLength
  }
  return parsed
}

try {
  const shaLength = parseLengthInput(getInput('sha_length'))

  if (context.eventName === 'pull_request') {
    const pullRequest = context.payload.pull_request
    const branch = slugify(pullRequest.head.ref)
    const sha = pullRequest.head.sha.slice(0, shaLength)
    setOutput('branch', branch)
    setOutput('sha', sha)
    console.log(`Output variables set for pull_request event: ${branch}-${sha}`)
  } else if (context.eventName === 'push' || context.eventName === 'workflow_dispatch' || context.eventName === 'schedule') {
    const parts = context.ref.split('/')
    const branch = slugify(parts[parts.length - 1])
    const sha = context.sha.slice(0, shaLength)
    setOutput('branch', branch)
    setOutput('sha', sha)
    console.log(`Output variables set for push event: ${branch}-${sha}`)
  } else {
    setFailed(`No implementation for event_name: ${context.eventName}`)
  }
} catch (error) {
  setFailed(error.message)
}
