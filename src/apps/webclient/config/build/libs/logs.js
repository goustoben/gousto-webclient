const { isDevelopmentBuild } = require('./build-time-env-config.js')

const logBuildInfo = (buildType) =>
  console.log(`

Build info for ${buildType}:

================
isDevelopmentBuild: ${isDevelopmentBuild}
NODE_ENV: ${process.env.NODE_ENV}
================

`)

module.exports = {
  logBuildInfo,
}
