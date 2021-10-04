const path = require('path')

const { getClientPlugins } = require('./build/libs/plugins')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const UIComponentsAlias = require('../libs/goustouicomponents/setup/webpackAlias')
const { build, publicPath, clientDevServerEnabled, hmrEnabled } = require('./build/libs/webpack-env-vars.js')
const { logBuildInfo } = require('./build/libs/logs')
const { getClientRules } = require('./build/libs/rules')

const isDevelopmentBuild = build === 'development'

logBuildInfo(isDevelopmentBuild)

const baseConfig = {
  context: path.resolve(__dirname, '..'),
  devtool: false,
  entry: {
    main: ['babel-polyfill', './src/client.js'],
    legacy: ['babel-polyfill', './src/legacy.js'],
    performanceTracker: ['./src/performanceTracker/entry.js'],
  },
  mode: 'production',
  module: {
    rules: getClientRules(isDevelopmentBuild, hmrEnabled),
  },
  name: 'client',
  node: {
    fs: 'empty',
  },
  output: {
    path: path.resolve('./public'),
    filename: '[name].bundle.[chunkhash].js',
    chunkFilename: '[name].bundle.[chunkhash].js',
    publicPath,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: (chunk) => chunk.name !== 'legacy',
          name: 'vendors',
          enforce: true,
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
  plugins: getClientPlugins(isDevelopmentBuild, hmrEnabled),
  resolve: {
    alias: {
      ...UIComponentsAlias(path.resolve(__dirname, '../libs/goustouicomponents'), '', false),
      ...UIComponentsAlias(path.resolve(__dirname, '../libs/goustouicomponents'), '', true),
      styles: path.resolve('./src/styles'),
      jsdom: path.resolve('./fallbacks/jsdom'),
      goustouicomponents: path.resolve(__dirname, '../libs/goustouicomponents/src/main'),
      zest: path.resolve(__dirname, '../libs/goustouicomponents/dist'),
    },
    modules: [
      path.resolve('./src'),
      path.resolve('./src/components'),
      path.resolve('./libs/goustouicomponents/src'),
      path.resolve('./node_modules'),
    ],
    extensions: ['.js', '.json', '.css', '.scss'],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  stats: {
    assets: false,
    children: false,
    chunks: false,
    errorDetails: true,
    errors: true,
    hash: true,
    modules: false,
    performance: true,
    publicPath: true,
    reasons: false,
    source: false,
    timings: true,
    version: true,
    warnings: false,
  },
  target: 'web',
}

const addOverridesForDevBuildConfig = (webpackConfig, _clientDevServerEnabled = false) => {
  const baseDevConfig = {
    ...webpackConfig,
    devtool: 'eval-cheap-module-source-map',
    entry: {
      main: ['babel-polyfill', './src/client.js'],
      performanceTracker: ['./src/performanceTracker/entry.js'],
    },
    mode: 'development',
    output: {
      path: path.resolve('./public'),
      filename: '[name].bundle.js',
      publicPath,
    },
  }

  const devConfigWithServer = {
    ...baseDevConfig,
    devServer: {
      compress: true,
      headers: {
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        'Access-Control-Allow-Origin': '*',
      },
      historyApiFallback: true,
      hot: true,
      port: 8080,
      public: 'frontend.gousto.local',
      watchOptions: { aggregateTimeout: 300, poll: 1000 },
      writeToDisk: true
    },
  }

  return _clientDevServerEnabled ?  devConfigWithServer : baseDevConfig
}

const smp = new SpeedMeasurePlugin({
  disable: !process.env.MEASURE,
})

const config = isDevelopmentBuild ? addOverridesForDevBuildConfig(baseConfig, clientDevServerEnabled) : baseConfig

module.exports = smp.wrap(config)
