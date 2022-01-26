const { build, envName, apiName, domain, clientProtocol, runningEnv, publicPath, hmrEnabled } = require('./webpack-env-vars.js')

const logBuildInfo = (isDevelopmentBuild) => console.log(`

================
isDevelopmentBuild = ${isDevelopmentBuild}
CLIENT BUILD: ${build},
CLIENT PROTOCOL: ${clientProtocol},
DOMAIN: ${domain},
ENVIRONMENT: ${envName},
NODE_APP_INSTANCE=${process.env.NODE_APP_INSTANCE},
NODE_CONFIG_ENV=${process.env.NODE_CONFIG_ENV}
NODE_ENV=${process.env.NODE_ENV}
POINTING TO API ENVIRONMENT: ${apiName},
PUBLIC PATH: ${publicPath},
RUNNING ENVIRONMENT: ${runningEnv}
HMR ENABLED: ${hmrEnabled}
================`)

module.exports = {
    logBuildInfo 
}
