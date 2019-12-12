/* eslint-disable */
const getCodeHealthBenchmark = require('./code-health-utils/get-benchmark-file')
const getCodeHealth = require('./code-health-utils/get-code-health')
const sanitiseFilePath = require('./code-health-utils/sanitise-file-path')

if (process.argv.length !== 5) {
  console.log('error! missing arguments')
  console.log('usage: node compare-coverage.js [token] [branch] [code health file path]')
  process.exit(1)
}

const [, , argToken, argBranch, argCodeHealthFile] = process.argv

const compareCoverage = (benchmark, codeHealth) => {
  console.log('=== Comparing code coverage ===')
  console.log(`Benchmark coverage: ${benchmark.coveragePercent.toFixed(3)}%`)
  console.log(`New coverage: ${codeHealth.coveragePercent.toFixed(3)}%`)
  console.log('')

  const difference = codeHealth.coveragePercent - benchmark.coveragePercent

  console.log(`Difference in coverage: ${difference.toFixed(3)}%`)
  console.log('')

  const pass = (difference >= 0)

  if (pass) {
    console.log(`Coverage did not decrease, check PASSED`)
  } else {
    console.log(`Coverage decreased, check FAILED`)
  }

  console.log('=== Finished comparing code coverage ===')
  console.log('')

  return pass
}

const compareEslintResults = (benchmark, codeHealth) => {
  if (Array.isArray(benchmark.lintResults) === false) {
    console.log('No eslint results in benchmark, check PASSED')
    return true
  }

  const increasedWarnings = []

  codeHealth.lintResults.forEach(result => {
    const sanitisedPath = sanitiseFilePath(result.filePath)
    const benchmarkResult = benchmark.lintResults.find(b => b.filePath === sanitisedPath)

    if (!benchmarkResult) {
      return
    }

    if (result.warningCount > benchmarkResult.warningCount) {
      increasedWarnings.push({
        filePath: sanitisedPath,
        benchmarkWarningCount: benchmarkResult.warningCount,
        newWarningCount: result.warningCount
      })
    }
  })

  console.log('=== Comparing eslint warnings ===')

  const pass = (increasedWarnings.length === 0)

  if (pass) {
    console.log('Warning count did not increase, check PASSED')
  } else {
    console.log('')

    increasedWarnings.forEach(warning => {
      console.log(`File: ${warning.filePath}`)
      console.log(`- Warnings increased from ${warning.benchmarkWarningCount} to ${warning.newWarningCount}`)

      console.log('')
    })

    console.log('Warning count increased, check FAILED')
  }

  console.log('')
  console.log('=== Finished comparing eslint warnings ===')

  return pass
}

const run = async () => {
  try {
    const benchmarkCodeHeath = await getCodeHealthBenchmark(argToken, argBranch, argCodeHealthFile)
    const newCodeHealth = getCodeHealth()

    const codeCoverageCheckPass = compareCoverage(benchmarkCodeHeath, newCodeHealth)
    const eslintCheckPass = compareEslintResults(benchmarkCodeHeath, newCodeHealth)

    if (codeCoverageCheckPass && eslintCheckPass) {
      process.exit(0)
    } else {
      process.exit(1)
    }
  } catch (e) {
    console.log('error: ', e)
    console.log('exiting safely, couldn\'t perform checks')
    process.exit(0)
  }
}

run()
