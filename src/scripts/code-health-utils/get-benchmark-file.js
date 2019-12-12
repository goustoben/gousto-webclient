/* eslint-disable */
const request = require('request')

const getCircleCIRecentBuildsUrl = (username, project, branch, token, limit, offset) => {
  return `https://circleci.com/api/v1.1/project/github/${username}/${project}/tree/${branch}?circle-token=${token}&limit=${limit}&offset=${offset}&filter=successful`
}

const getCircleCIArtifactsUrl = (username, project, buildNumber, token, branch) => {
  return `https://circleci.com/api/v1.1/project/github/${username}/${project}/${buildNumber}/artifacts?circle-token=${token}&branch=${branch}&filter=successful`
}

const CODE_HEALTH_ARTIFACT_JOB_NAME = 'publish-code-health-artifact'
const RECENT_BUILD_LIMIT = 50
const MAX_REQUESTS = 5

const recursive_getRecentArtifactBuild = (resolve, reject, token, limit, offset) => {
  if (offset / RECENT_BUILD_LIMIT > MAX_REQUESTS) {
    return reject(`No artifact build found, offset ${offset} reached, stopping`)
  }

  request(
    getCircleCIRecentBuildsUrl('Gousto', 'gousto-webclient', 'develop', token, limit, offset),
    { json: true },
    (error, response, body) => {
      if (error) {
        return reject(error)
      }

      if (!body || !body.length) {
        return reject('No recent builds returned from API')
      }

      const build = body.find(b => b.workflows && b.workflows.job_name === CODE_HEALTH_ARTIFACT_JOB_NAME)

      if (!build) {
        return recursive_getRecentArtifactBuild(resolve, reject, token, limit, offset + RECENT_BUILD_LIMIT)
      }

      return resolve(build.build_num)
    }
  )
}

const getRecentArtifactBuild = (token) => {
  return new Promise((resolve, reject) => {
    recursive_getRecentArtifactBuild(resolve, reject, token, RECENT_BUILD_LIMIT, 0)
  })
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

    getRecentArtifactBuild(token)
      .then((buildNum) => {
        request(
          getCircleCIArtifactsUrl('Gousto', 'gousto-webclient', buildNum, token, branch),
          { json: true },
          getArtifactListCallback
        )
      })
      .catch(e => reject(e))
  })
}

module.exports = getCodeHealthBenchmark
