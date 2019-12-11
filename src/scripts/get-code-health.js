/* eslint-disable */
const fs = require('fs')
const path = require('path')

module.exports = () => {
  const coveragePath = path.resolve(__dirname, '../', 'coverage', 'coverage-summary.json')

  if (fs.existsSync(coveragePath) === false) {
    console.log('No code coverage file could be found.')
    process.exit(0)
  }
  
  const coverageSummary = require(coveragePath)
  
  return {
    coverage_pct: coverageSummary.total.lines.pct
  }
}
