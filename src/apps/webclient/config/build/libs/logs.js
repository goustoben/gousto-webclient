const { build, envName } = require('./webpack-env-vars.js')

const logBuildInfo = (isDevelopmentBuild) => console.log(`

================
isDevelopmentBuild = ${isDevelopmentBuild}
HMR ENABLED: ${isDevelopmentBuild}
CLIENT BUILD: ${build},
ENVIRONMENT: ${envName},
NODE_APP_INSTANCE=${process.env.NODE_APP_INSTANCE},
NODE_CONFIG_ENV=${process.env.NODE_CONFIG_ENV}
NODE_ENV=${process.env.NODE_ENV}
================`)

module.exports = {
    logBuildInfo
}
