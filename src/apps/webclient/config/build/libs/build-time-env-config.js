const isDevelopmentBuild = process.env.NODE_ENV === 'development'

const BUILD_NUMBER = process.env.CIRCLE_BUILD_NUM || 'local'
const publicPath = `/build/${BUILD_NUMBER}/`

const buildTimeEnvConfig = {
  __CIRCLE_BUILD_NUM__: JSON.stringify(process.env.CIRCLE_BUILD_NUM),
}

module.exports = {
  buildTimeEnvConfig,
  // TODO - No longer set by node-config - will remove after FEF-380
  clientDevServerEnabled: false,
  publicPath,
  isDevelopmentBuild,
}
