const nodeConfig = require('node-config')

const build = nodeConfig.get('build')
const clientDevServerEnabled = nodeConfig.get('client_dev_server_enabled')
const clientProtocol = nodeConfig.get('client_protocol')
const domain = nodeConfig.get('domain')
const envName = nodeConfig.get('environment_name')
const runningEnv = nodeConfig.get('running_env')

const publicPath = '/build/latest/'

const webpackEnvVarsBase = {
  __CLIENT_PROTOCOL__: JSON.stringify(clientProtocol),
  __ENV__: JSON.stringify(envName),
  __RUNNING_ENV__: JSON.stringify(runningEnv),
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
  clientProtocol,
  domain,
  envName,
  runningEnv,
  publicPath,
}
