/* eslint-disable no-console */
const path = require('path')

// eslint-disable-next-line import/no-extraneous-dependencies
const Codeowners = require('codeowners')

const { getGitignoreMatcher } = require('./get-gitignore-matcher')
const { getFilesByOwner } = require('./get-files-by-owner')

const rootPath = path.resolve(__dirname, '../../../')
const gitignoreMatcher = getGitignoreMatcher(rootPath)

const codeowners = new Codeowners(rootPath)

const isUnownedReport = process.argv[2] === '--unowned'

getFilesByOwner(rootPath, codeowners, gitignoreMatcher)
  .then(filesByOwner => {
    if (isUnownedReport) {
      const unownedFiles = filesByOwner['@Gousto/guild-frontend']

      if (unownedFiles.length === 0) {
        console.log('No unowned files!')

        return
      }

      unownedFiles.forEach(file => {
        console.log(` - ${file}`)
      })

      console.log('')
      console.log(`${unownedFiles.length} unowned files`)

      return
    }

    console.log('Files by owner:')

    Object.entries(filesByOwner).forEach(([owner, files]) => {
      console.log(` - ${owner}: ${files.length} files`)
    })
  })
  .catch(e => console.error(e))
