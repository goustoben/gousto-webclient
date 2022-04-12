const build = process.env.NODE_ENV
const isDevelopmentBuild = build === 'development'

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
  __DEV__: isDevelopmentBuild,
}

module.exports = {
  webpackEnvVarsDev,
  webpackEnvVarsClient,
  webpackEnvVarsServer,
  build,
  clientDevServerEnabled: false,
  publicPath,
  isDevelopmentBuild
}
