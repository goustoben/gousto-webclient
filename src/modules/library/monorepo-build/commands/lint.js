/**
 * Gets eslint job for one workspace
 *
 * @param {Object}      ctx               - Runtime context of the command
 * @param {Function}    ctx.localChanges  - Get changed files, relative to workspace
 * @param {Function}    ctx.stdout        - Writes to STDOUT
 *
 * @returns {Promise<void>}
 */
async function lint (ctx) {
  const changes = ctx.localChanges()

  // If eslint config files are created / changed / deleted, we must re-validate everything
  const ignoreFileChanged = changes.find(change => change.relativePath === '.eslintignore')
  const rcFileChanged = changes.find(change => change.relativePath === '.eslintrc.js')
  if (ignoreFileChanged || rcFileChanged) {
    return ctx.stdout('.')
  }

  const results = changes
    .filter(change => !change.deleted)
    .filter(change => change.filepath.match(/[jt]s(x?)$/g))
    .map(change => change.relativePath)

  // Only write to STDOUT if we have results. This enables us to do [ -f file ] based conditions
  if (results.length) {
    const line = results.join(' ')
    return ctx.stdout(line)
  }
}

module.exports = {
  lint
}
