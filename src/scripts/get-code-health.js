/* eslint-disable */
const fs = require('fs')
const path = require('path')

const sanitiseEslintFileResult = (file) => ({ 
  filePath: file.filePath, 
  errorCount: file.errorCount, 
  warningCount: file.warningCount
})

module.exports = () => {
  const coveragePath = path.resolve(__dirname, '../', 'coverage', 'coverage-summary.json')

  if (fs.existsSync(coveragePath) === false) {
    console.log('No code coverage file could be found.')
    process.exit(0)
  }

  const eslintResultsPath = path.resolve(__dirname, '../', 'eslint-results.json')

  if (fs.existsSync(eslintResultsPath) === false) {
    console.log('No eslint results file could be found.')
    process.exit(0)
  }
  
  const coverageSummary = require(coveragePath)
  const eslintResults = require(eslintResultsPath)
  
  return {
    coveragePercent: coverageSummary.total.lines.pct,
    lintResults: eslintResults.map(sanitiseEslintFileResult)
  }
}
