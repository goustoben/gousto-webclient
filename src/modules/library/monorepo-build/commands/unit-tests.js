/**
 * Determines whether workspace requires unit test run
 *
 * @param {Object}      ctx               - Runtime context of the command
 * @param {Function}    ctx.localChanges  - Get changed files, relative to workspace
 * @param {Function}    ctx.stdout        - Writes to STDOUT
 *
 * @returns {Promise<void>}
 */
async function unitTests(ctx) {
  const changes = ctx.localChanges()

  if (changes.length) {
    return ctx.stdout('truthy')
  }
}

module.exports = {
  unitTests,
}
