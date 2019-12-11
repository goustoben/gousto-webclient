/* eslint-disable */
const request = require('request')
const getCodeHealth = require('./get-code-health')

if (process.argv.length !== 5) {
  console.log('error! missing arguments')
  console.log('usage: node compare-coverage.js [token] [branch] [code health file path]')
  process.exit(1)
}

const [, , argToken, argBranch, argCodeHealthFile] = process.argv

const getCircleCIArtifactsUrl = (username, project, token, branch) => {
  return `https://circleci.com/api/v1.1/project/github/${username}/${project}/latest/artifacts?circle-token=${token}&branch=${branch}&filter=successful`
}

const getCodeHealthBenchmark = (token, branch, filePath) => {
  return new Promise((resolve, reject) => {
    const getCodeHealthFileCallback = (error, response, body) => {
      if (error) {
        return reject(error)
      }

      return resolve(body)
    }

    const getArtifactListCallback = (error, response, body) => {
      if (error) {
        return reject(error)
      }

      const codeHealthFile = body.find(file => file.path === filePath)

      if (!codeHealthFile) {
        return reject(`No file '${filePath}' found`)
      }

      request(
        `${codeHealthFile.url}?circle-token=${token}`,
        { json: true },
        getCodeHealthFileCallback
      )
    }

    request(
      getCircleCIArtifactsUrl('Gousto', 'gousto-webclient', token, branch),
      { json: true },
      getArtifactListCallback
    )
  })
}

const compareCoverage = (benchmark, codeHealth) => {
  console.log('=== Comparing code coverage ===')
  console.log(`Benchmark coverage: ${benchmark.coveragePercent.toFixed(2)}%`)
  console.log(`New coverage: ${codeHealth.coveragePercent.toFixed(2)}%`)
  console.log('')

  const difference = codeHealth.coveragePercent - benchmark.coveragePercent

  console.log(`Difference in coverage: ${difference.toFixed(2)}%`)
  console.log('')

  const pass = (difference < 0)

  if (pass) {
    console.log(`Coverage did not decrease, check PASSED`)
  } else {
    console.log(`Coverage decreased, check FAILED`)
  }

  console.log('=== Finished comparing code coverage ===')
  console.log('')

  return pass
}

const run = async () => {
  try {
    const benchmarkCodeHeath = await getCodeHealthBenchmark(argToken, argBranch, argCodeHealthFile)
    const newCodeHealth = getCodeHealth()

    const codeCoverageCheckPass = compareCoverage(benchmarkCodeHeath, newCodeHealth)

    if (codeCoverageCheckPass) {
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
