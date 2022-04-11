const nodeConfig = require('node-config')

const build = nodeConfig.get('build')
const clientDevServerEnabled = nodeConfig.get('client_dev_server_enabled')

const BUILD_NUMBER = process.env.CIRCLE_BUILD_NUM || 'local'

const publicPath = `/build/${BUILD_NUMBER}/`

const webpackEnvVarsBase = {
  __CIRCLE_BUILD_NUM__: JSON.stringify(process.env.CIRCLE_BUILD_NUM),
}

const webpackEnvVarsDev = {
  ...webpackEnvVarsBase,
}

// will refactor this out in subsequent BODA work
const webpackEnvVarsClient = {
  ...webpackEnvVarsBase,
}

const webpackEnvVarsServer = {
  ...webpackEnvVarsBase,
  __DEV__: build === 'development',
}

module.exports = {
  webpackEnvVarsDev,
  webpackEnvVarsClient,
  webpackEnvVarsServer,
  build,
  clientDevServerEnabled,
  publicPath,
}
