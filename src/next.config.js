/* eslint-disable no-param-reassign */
const path = require('path')
const UIComponentsAlias = require('./libs/goustouicomponents/setup/webpackAlias')
const { webpackEnvVarsDev, webpackEnvVarsClient } = require('./config/build/libs/webpack-env-vars')
const webpack = require('webpack'); // eslint-disable-line

module.exports = {
  /* config options here */
  ssr: false,
  webpack(config, { isServer, isDev }) {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      ...UIComponentsAlias(path.resolve(__dirname, './libs/goustouicomponents'), '', false),
      ...UIComponentsAlias(path.resolve(__dirname, './libs/goustouicomponents'), '', true),
      ...UIComponentsAlias(path.resolve(__dirname, './libs/goustouicomponents'), './', false),
      ...UIComponentsAlias(path.resolve(__dirname, './libs/goustouicomponents'), './', true),
      styles: path.resolve('./src/styles'),
      jsdom: path.resolve('./fallbacks/jsdom'),
      goustouicomponents: path.resolve(__dirname, './libs/goustouicomponents/src/main'),
      zest: path.resolve(__dirname, './libs/goustouicomponents/dist'),
      'design-language': path.join(__dirname, './libs/goustouicomponents/src/design-language'),
      // not working
    //   media: path.resolve(__dirname, './src/media'),
    //   routes: path.resolve(__dirname, './src/routes'),
    }
    config.resolve.modules = [
      ...config.resolve.modules,
      path.resolve('./src'),
      path.resolve('./src/components'),
      path.resolve('./libs/goustouicomponents/src'),
      path.resolve('./node_modules'),
    ]

    const webpackEnvVars = isDev ? webpackEnvVarsDev : webpackEnvVarsClient

    config.plugins.push(new webpack.DefinePlugin(webpackEnvVars))

    return config
  }
}
