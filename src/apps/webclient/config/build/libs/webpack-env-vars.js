const nodeConfig = require('node-config')

const apiName = nodeConfig.get('api_name')
const authClientId = nodeConfig.get('auth_client_id')
const authClientSecret = nodeConfig.get('auth_client_secret')
const build = nodeConfig.get('build')
const clientDevServerEnabled = nodeConfig.get('client_dev_server_enabled')
const clientProtocol = nodeConfig.get('client_protocol')
const domain = nodeConfig.get('domain')
const envName = nodeConfig.get('environment_name')
const recaptchaReferralPrivateKey = nodeConfig.get('recaptcha_referral_private_key')
const runningEnv = nodeConfig.get('running_env')

const publicPath = '/build/latest/'

const webpackEnvVarsBase = {
  __API_ENV__: JSON.stringify(apiName),
  __CLIENT_PROTOCOL__: JSON.stringify(clientProtocol),
  __DOMAIN__: JSON.stringify(domain),
  __ENV__: JSON.stringify(envName),
  __RUNNING_ENV__: JSON.stringify(runningEnv),
  __CIRCLE_BUILD_NUM__: JSON.stringify(process.env.CIRCLE_BUILD_NUM),
}

const webpackEnvVarsDev = {
  ...webpackEnvVarsBase,
  __DOMAIN__: JSON.stringify(domain)
}

// will refactor this out in subsequent BODA work
const webpackEnvVarsClient = {
  ...webpackEnvVarsBase
}

const webpackEnvVarsServer = {
  ...webpackEnvVarsBase,
  __AUTH_CLIENT_ID__: JSON.stringify(authClientId),
  __AUTH_CLIENT_SECRET__: JSON.stringify(authClientSecret),
  __DEV__: build === 'development',
  __RECAPTCHA_RAF_PVTK__: JSON.stringify(recaptchaReferralPrivateKey),
}

module.exports = {
  webpackEnvVarsDev,
  webpackEnvVarsClient,
  webpackEnvVarsServer,
  apiName,
  authClientId,
  authClientSecret,
  build,
  clientDevServerEnabled,
  clientProtocol,
  domain,
  envName,
  recaptchaReferralPrivateKey,
  runningEnv,
  publicPath,
}
