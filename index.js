const core = require('@actions/core')
const github = require('@actions/github')

const defaultShaLength = 7

/**
 * A copy of the function gitlab uses to slugify the commit ref (branch or tag name)
 * to set the CI_COMMIT_REF_SLUG variable used to name resources.
 *
 * From https://gitlab.com/gitlab-org/gitlab-ce/blob/master/lib/gitlab/utils.rb
 * A slugified version of the string, suitable for inclusion in URLs and
 * domain names. Rules:
 *
 *   * Lowercased
 *   * Anything not matching [a-z0-9-] is replaced with a -
 *   * Maximum length is 63 bytes
 *   * First/Last Character is not a hyphen
 * def slugify(str)
 *   return str.downcase
 *     .gsub(/[^a-z0-9]/, '-')[0..62]
 *     .gsub(/(\A-+|-+\z)/, '')
 * end
 */
const slugify = branch => {
  // convert all non alphanumeric chars to hyphen
  let ret = branch.toLowerCase().replace(/[^a-z0-9]/g, '-')

  while (ret.endsWith('-')) {
    ret = ret.slice(0, ret.length - 1)
  }

  while (ret.startsWith('-')) {
    ret = ret.slice(1, ret.length)
  }

  // take first 63 chars
  return ret.slice(0, 63)
}

const parseLengthInput = s => {
  const parsed = parseInt(s, 10)
  if (isNaN(parsed)) { return defaultShaLength }
  return parsed
}

try {
  const shaLength = parseLengthInput(core.getInput('sha_length'))

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
  } else {
    core.setFailed(`No implementation for event_name: ${github.context.eventName}`)
  }
} catch (error) {
  core.setFailed(error.message)
}
