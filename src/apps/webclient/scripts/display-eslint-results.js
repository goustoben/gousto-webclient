/* eslint-disable */
const fs = require('fs')
const path = require('path')
const { ESLint } = require('eslint')
const resultsPath = path.resolve(__dirname, '../', 'eslint-results.json')

if (fs.existsSync(resultsPath) === false) {
  console.log('No eslint results file could be found.')
  console.log(`Expected to find it at: ${resultsPath}`)
  process.exit(0)
}

const results = require(resultsPath)

async function displayFormattedResults() {
  const api = new ESLint()

  const formatter = await api.loadFormatter()
  const formattedResults = (formatter.format(results))

  process.stdout.write(formattedResults)
}

displayFormattedResults()
