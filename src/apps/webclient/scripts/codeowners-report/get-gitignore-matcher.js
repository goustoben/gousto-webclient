const fs = require('fs')
const path = require('path')

// eslint-disable-next-line import/no-extraneous-dependencies
const ignore = require('ignore')

const getGitignoreMatcher = (rootPath) => {
  const gitignorePath = path.resolve(rootPath, './.gitignore')

  const gitignore = fs.readFileSync(gitignorePath).toString()

  const gitignoreMatcher = ignore()
  gitignoreMatcher.add(gitignore)

  return gitignoreMatcher
}

module.exports = { getGitignoreMatcher }
