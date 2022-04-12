const { build, isDevelopmentBuild } = require('./build-time-config.js')

const logBuildInfo = () =>
  console.log(`

================
isDevelopmentBuild: ${isDevelopmentBuild}
BUILD: ${build},
NODE_ENV: ${process.env.NODE_ENV}
================`)

module.exports = {
  logBuildInfo,
}
