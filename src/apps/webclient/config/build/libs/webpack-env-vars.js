const nodeConfig = require('node-config')

const apiName = nodeConfig.get('api_name')
const apiToken = nodeConfig.get('api_token')
const authClientId = nodeConfig.get('auth_client_id')
const authClientSecret = nodeConfig.get('auth_client_secret')
const build = nodeConfig.get('build')
const clientDevServerEnabled = nodeConfig.get('client_dev_server_enabled')
const clientProtocol = nodeConfig.get('client_protocol')
const cloudfrontUrl = nodeConfig.get('cloudfront_url')
const domain = nodeConfig.get('domain')
const endpoints = nodeConfig.get('endpoints')
const envName = nodeConfig.get('environment_name')
const recaptchaReferralPrivateKey = nodeConfig.get('recaptcha_referral_private_key')
const runningEnv = nodeConfig.get('running_env')

const publicPath = cloudfrontUrl
  ? `${clientProtocol}://${cloudfrontUrl}/build/latest/`
  : '/nsassets/'

const webpackEnvVarsBase = {
  __API_ENV__: JSON.stringify(apiName),
  __CLIENT_PROTOCOL__: JSON.stringify(clientProtocol),
  __CLOUDFRONT_URL__: JSON.stringify(cloudfrontUrl),
  __DOMAIN__: JSON.stringify(domain),
  __ENDPOINTS__: JSON.stringify(endpoints),
  __ENV__: JSON.stringify(envName),
  __RUNNING_ENV__: JSON.stringify(runningEnv),
  __CIRCLE_BUILD_NUM__: JSON.stringify(process.env.CIRCLE_BUILD_NUM),
}

const webpackEnvVarsDev = {
  ...webpackEnvVarsBase,
  __DOMAIN__: JSON.stringify(domain),
  __PROD__: false,
  'process.env.NODE_ENV': JSON.stringify('development'),
}

const webpackEnvVarsClient = {
  ...webpackEnvVarsBase,
  __PROD__: build === 'production',
  'process.env.NODE_ENV': JSON.stringify(build === 'legacy' ? 'production' : build),
}

const webpackEnvVarsServer = {
  ...webpackEnvVarsBase,
  __API_TOKEN__: JSON.stringify(apiToken),
  __AUTH_CLIENT_ID__: JSON.stringify(authClientId),
  __AUTH_CLIENT_SECRET__: JSON.stringify(authClientSecret),
  __DEV__: build === 'development',
  __PROD__: build === 'production',
  __RECAPTCHA_RAF_PVTK__: JSON.stringify(recaptchaReferralPrivateKey),
  'process.env.NODE_ENV': JSON.stringify(build),
}

module.exports = {
  webpackEnvVarsDev,
  webpackEnvVarsClient,
  webpackEnvVarsServer,
  apiName,
  apiToken,
  authClientId,
  authClientSecret,
  build,
  clientDevServerEnabled,
  clientProtocol,
  cloudfrontUrl,
  domain,
  endpoints,
  envName,
  publicPath,
  recaptchaReferralPrivateKey,
  runningEnv,
}
