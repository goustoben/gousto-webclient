const build = process.env.NODE_ENV
const isDevelopmentBuild = build === 'development'

const BUILD_NUMBER = process.env.CIRCLE_BUILD_NUM || 'local'
const publicPath = `/build/${BUILD_NUMBER}/`

const buildTimeEnvConfigBase = {
  __CIRCLE_BUILD_NUM__: JSON.stringify(process.env.CIRCLE_BUILD_NUM),
}

// TODO - This will be removed after FEF-421
const buildTimeEnvConfigServer = {
  ...buildTimeEnvConfigBase,
  __DEV__: isDevelopmentBuild,
}

module.exports = {
  build,
  buildTimeEnvConfigBase,
  buildTimeEnvConfigServer,
  // TODO - No longer set by node-config - will remove after FEF-380
  clientDevServerEnabled: false,
  publicPath,
  isDevelopmentBuild,
}
