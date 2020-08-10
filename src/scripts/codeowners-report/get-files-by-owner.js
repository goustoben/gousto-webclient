const path = require('path')
const { walk } = require('./walk')

const getFilesByOwner = (rootPath, codeowners, gitignoreMatcher) => (
  new Promise((resolve, reject) => {
    const filesByOwner = {}

    walk(rootPath, ['.git', 'node_modules'], (err, files) => {
      if (err) {
        reject(err)

        return
      }

      files.sort()

      const relativeFiles = files.map(file => path.relative(codeowners.codeownersDirectory, file))
      const filteredFiles = relativeFiles.filter(gitignoreMatcher.createFilter()).sort()

      filteredFiles.forEach(file => {
        const owners = codeowners.getOwner(file)

        if (owners.length === 0) {
          reject(new Error(`file has no owner: ${file}`))

          return
        }

        if (owners.length > 1) {
          reject(new Error(`file has more than 1 owner: ${file}`))

          return
        }

        const [owner] = owners

        if (!filesByOwner[owner]) {
          filesByOwner[owner] = []
        }

        filesByOwner[owner].push(file)
      })

      resolve(filesByOwner)
    })
  })
)

module.exports = { getFilesByOwner }
