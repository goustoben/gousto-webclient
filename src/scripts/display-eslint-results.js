/* eslint-disable */
const fs = require('fs')
const path = require('path')

const eslintStylishFormatter = require('eslint/lib/cli-engine/formatters/stylish')

const resultsPath = path.resolve(__dirname, '../', 'eslint-results.json')

if (fs.existsSync(resultsPath) === false) {
  console.log('No eslint results file could be found.')
  console.log(`Expected to find it at: ${resultsPath}`)
  process.exit(0)
}

const results = require(resultsPath)

process.stdout.write(eslintStylishFormatter(results))
