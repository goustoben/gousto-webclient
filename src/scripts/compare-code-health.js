/* eslint-disable */
const readline = require('readline')
const getCodeHealthBenchmark = require('./code-health-utils/get-benchmark-file')
const getCodeHealth = require('./code-health-utils/get-code-health')
const sanitiseFilePath = require('./code-health-utils/sanitise-file-path')
const getFailureMessages = require('./code-health-utils/get-failure-messages')

if (process.argv.length !== 5) {
  console.log('error! missing arguments')
  console.log('usage: node compare-coverage.js [token] [branch] [code health file path]')
  process.exit(1)
}

const [, , argToken, argBranch, argCodeHealthFile] = process.argv

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

const parseGitDiffLine = (line) => {
  const result = /^(\w{1})\s+(.+)$/.exec(line)

  if (result === null) {
    return null
  }

  return {
    status: result[1],
    path: result[2]
  }
}

const compareHealth = (status, path, benchmarkCodeHealth, newCodeHealth) => {
  // skip deletions
  if (status === 'D') {
    return
  }

  const sanitisedPath = sanitiseFilePath(path)
  const benchmark = benchmarkCodeHealth.files.find(f => f.path === sanitisedPath)
  const newHealth = newCodeHealth.files.find(f => f.path === sanitisedPath)

  if (!newHealth) {
    return null
  }

  const details = {
    path: sanitisedPath,
    failures: getFailureMessages(benchmark, newHealth)
  }

  if (details.failures.length === 0) {
    return null
  }

  return details
}

const printSuccess = () => {
  console.log('No regressions in affected files, code health check passed!')
}

const printFailures = (failures) => {
  failures.forEach(failedFile => {
    console.log(`${failedFile.path}:`)

    failedFile.failures.forEach(failure => {
      console.log(` - ${failure}`)
    })

    console.log('')
  })

  console.log(`Code health regressions in ${failures.length} files, code health check failed`)
}

const run = async () => {
  try {
    const benchmarkCodeHealth = await getCodeHealthBenchmark(argToken, argBranch, argCodeHealthFile)

    if (!benchmarkCodeHealth.files) {
      console.log('Benchmark is in old format, unable to compare health')
      console.log('Exiting without failure')
      process.exit(0)
      return
    }

    const newCodeHealth = getCodeHealth()

    const failures = []

    rl.on('line', line => {
      const parsed = parseGitDiffLine(line)

      // skip this line if we can't parse it
      if (parsed === null) {
        return
      }

      const failure = compareHealth(parsed.status, parsed.path, benchmarkCodeHealth, newCodeHealth)

      if (failure === null) {
        return
      }

      failures.push(failure)
    })

    rl.on('close', () => {
      if (failures.length === 0) {
        printSuccess()
        process.exit(0)
      } else {
        printFailures(failures)
        process.exit(1)
      }
    })
  } catch (e) {
    console.log('error: ', e)
    console.log('exiting safely, couldn\'t perform checks')
    process.exit(0)
  }
}

run()
