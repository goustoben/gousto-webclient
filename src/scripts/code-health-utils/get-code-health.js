/* eslint-disable */
const fs = require('fs')
const path = require('path')
const sanitiseFilePath = require('./sanitise-file-path')

const createReport = (eslintResults) => {
  const files = []

  for (const file of eslintResults) {
    files.push({
      path: sanitiseFilePath(file.filePath),
      errorCount: file.errorCount,
      warningCount: file.warningCount,
      coveragePercent: null,
    })
  }

  return {
    files,
  }
}

module.exports = () => {
  const eslintResultsPath = path.resolve(__dirname, '../../', 'eslint-results.json')

  if (fs.existsSync(eslintResultsPath) === false) {
    console.log('No eslint results file could be found.')
    process.exit(0)
  }

  const eslintResults = require(eslintResultsPath)

  return createReport(eslintResults)
}
