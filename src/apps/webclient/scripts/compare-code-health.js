/* eslint-disable */
const concat = require('concat-stream')
const getCodeHealthBenchmark = require('./code-health-utils/get-benchmark-file')
const getCodeHealth = require('./code-health-utils/get-code-health')
const sanitiseFilePath = require('./code-health-utils/sanitise-file-path')
const getFailureMessages = require('./code-health-utils/get-failure-messages')
const ignoredFiles = require('./code-health-utils/ignored-files')

if (!process.env.CIRCLECI_ACCESS_TOKEN) {
  console.log('error! process.env.CIRCLECI_ACCESS_TOKEN not set')
  process.exit(1)
}

if (process.argv.length !== 4) {
  console.log('error! missing arguments')
  console.log('usage: node compare-coverage.js [branch] [code health file path]')
  process.exit(1)
}

console.log('')
console.log('')
console.log('=============== Beginning code health comparison ===============')
console.log('')

const [, , argBranch, argCodeHealthFile] = process.argv

const parseGitDiffLine = (line) => {
  const result = /^(\S+)\s+(\S+)(\s+(\S+))?$/.exec(line)

  if (result === null) {
    return null
  }

  const status = result[1]

  return {
    status,
    path: status[0] === 'R' ? result[4] : result[2],
  }
}

const compareHealth = (status, path, benchmarkCodeHealth, newCodeHealth) => {
  // skip deletions
  if (status === 'D') {
    return null
  }

  const sanitisedPath = sanitiseFilePath(path)
  // todo FEF-288: Remove the pre-workspace-path matching once the new package structure is merged
  const preWorkspacePath = sanitisedPath.replace(/src\/apps\/webclient/g, 'src')
  const benchmark = benchmarkCodeHealth.files.find(f => f.path === sanitisedPath || f.path === preWorkspacePath)
  const newHealth = newCodeHealth.files.find(f => f.path === sanitisedPath)

  if (!newHealth) {
    return null
  }

  const details = {
    path: sanitisedPath,
    failures: getFailureMessages(benchmark, newHealth, sanitisedPath)
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

const run = async (changedFiles) => {
  if (changedFiles.length === 0) {
    console.log('No changed files detected')
    console.log('Exiting without failure')
    process.exit(0)
    return
  }

  try {
    const benchmarkCodeHealth = await getCodeHealthBenchmark(process.env.CIRCLECI_ACCESS_TOKEN, argBranch, argCodeHealthFile)

    if (!benchmarkCodeHealth.files) {
      console.log('Benchmark is in old format, unable to compare health')
      console.log('Exiting without failure')
      process.exit(0)
      return
    }

    const newCodeHealth = getCodeHealth()

    const failures = []

    changedFiles
      .filter(file => !ignoredFiles.includes(file.path))
      .forEach(parsed => {
        const failure = compareHealth(parsed.status, parsed.path, benchmarkCodeHealth, newCodeHealth)

        if (failure === null) {
          return
        }

        failures.push(failure)
      })

    if (failures.length > 0) {
      printFailures(failures)
      process.exit(1)
      return
    }

    printSuccess()
    process.exit(0)
  } catch (e) {
    console.log('error: ', e)
    console.log('exiting with error, couldn\'t perform checks')
    process.exit(1)
  }
}

process.stdin.pipe(concat(buf => {
  const fullInput = buf.toString()

  const changedFiles = fullInput.split('\n')
    .map(parseGitDiffLine)
    .filter(line => line !== null)

  run(changedFiles)
}))
