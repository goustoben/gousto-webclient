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
  return `https://circleci.com/api/v1.1/project/github/${username}/${project}/latest/artifacts?circle-token=${token}&branch=${branch}`
}

const getCoverageBenchmark = (token, branch, filePath) => {
  return new Promise((resolve, reject) => {
    const getCodeHealthFileCallback = (error, response, body) => {
      if (error) {
        return reject(error)
      }

      return resolve(body.coverage_pct)
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

const run = async () => {
  try {
    const benchmark = await getCoverageBenchmark(argToken, argBranch, argCodeHealthFile)

    const { coverage_pct } = getCodeHealth()

    console.log('=== Comparing code coverage ===')
    console.log(`Benchmark coverage: ${benchmark.toFixed(2)}%`)
    console.log(`New coverage: ${coverage_pct.toFixed(2)}%`)
    console.log('')

    const difference = coverage_pct - benchmark

    console.log(`Difference in coverage: ${difference.toFixed(2)}%`)
    console.log('')

    if (difference < 0) {
      console.log(`Coverage decreased, build FAILED`)
      process.exit(1)
    }

    console.log(`Coverage did not decrease, build PASSED`)
    process.exit(0)
  } catch (e) {
    console.log('error: ', e)
    console.log('exiting safely, couldn\'t compare coverage')
    process.exit(0)
  }
}

run()
