/* eslint-disable */
const fs = require('fs')
const path = require('path')
const sanitiseFilePath = require('./sanitise-file-path')

const createReport = (coverageSummary, eslintResults) => {
  const files = []

  for (const file of eslintResults) {
    files.push({
      path: sanitiseFilePath(file.filePath), 
      errorCount: file.errorCount, 
      warningCount: file.warningCount,
      coveragePercent: null
    })
  }

  for (const [ path, file ] of Object.entries(coverageSummary)) {
    // don't look at total coverage info - only individual files
    if (path === 'total') {
      continue
    }

    const sanitisedPath = sanitiseFilePath(path)
    const coveragePercent = file.lines.pct

    const existingFile = files.find(f => f.path === sanitisedPath)

    if (existingFile) {
      existingFile.coveragePercent = coveragePercent
    } else {
      files.push({
        path: sanitisedPath,
        errorCount: null,
        warningCount: null,
        coveragePercent
      })
    }
  }

  return {
    files
  }
}

module.exports = () => {
  const coveragePath = path.resolve(__dirname, '../../', 'coverage', 'coverage-summary.json')

  if (fs.existsSync(coveragePath) === false) {
    console.log('No code coverage file could be found.')
    process.exit(0)
  }

  const eslintResultsPath = path.resolve(__dirname, '../../', 'eslint-results.json')

  if (fs.existsSync(eslintResultsPath) === false) {
    console.log('No eslint results file could be found.')
    process.exit(0)
  }
  
  const coverageSummary = require(coveragePath)
  const eslintResults = require(eslintResultsPath)

  return createReport(coverageSummary, eslintResults)
}
