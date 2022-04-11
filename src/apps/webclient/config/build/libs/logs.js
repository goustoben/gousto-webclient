const { build } = require('./webpack-env-vars.js')

const logBuildInfo = (isDevelopmentBuild) =>
  console.log(`

================
isDevelopmentBuild = ${isDevelopmentBuild}
HMR ENABLED: ${isDevelopmentBuild}
CLIENT BUILD: ${build},
NODE_CONFIG_ENV=${process.env.NODE_CONFIG_ENV}
NODE_ENV=${process.env.NODE_ENV}
================`)

module.exports = {
  logBuildInfo,
}
