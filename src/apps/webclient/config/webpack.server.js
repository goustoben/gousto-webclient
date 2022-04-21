const webpack = require('webpack')
const path = require('path')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const nodeExternals = require('webpack-node-externals')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ExitCodePlugin = require('./exitCode')
const { fontRules, imageRules } = require('./build/libs/rules')
const UIComponentsAlias = require('../libs/goustouicomponents/setup/webpackAlias')

const {
  isDevelopmentBuild,
  buildTimeEnvConfig,
  publicPath,
} = require('./build/libs/build-time-env-config.js')

const cssHashPattern = isDevelopmentBuild
  ? '[name]__[local]___[hash:base64:5]'
  : 'G[sha1:hash:hex:6]'
const { logBuildInfo } = require('./build/libs/logs')

logBuildInfo('server')

const config = {
  name: 'server',
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, '..'),
  target: 'node',
  entry: [
    './server/main.js',
  ],
  output: {
    path: path.resolve('./dist'),
    filename: 'server.js',
    publicPath,
  },
  module: {
    rules: [
      {
        test: /^(?!.*(test\.js|spec\.js)).*\.js(x){0,1}$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, '../server/tsconfig.json'),
          logLevel: "error",
          onlyCompileBundledFiles: true,
          /*transpile Javascript but don't typecheck at build time */
          transpileOnly: true
        }
      },
      {
        test: /^(?!.*(test\.ts|spec\.ts)).*\.ts(x){0,1}$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, '../server/tsconfig.json'),
          logLevel: "error",
          onlyCompileBundledFiles: true,
          /* transpile and typecheck Typescript */
          transpileOnly: false
        }
      },
      {
        test: /\.css$/,
        loader: `css-loader/locals?modules&importLoaders=0&localIdentName=${cssHashPattern}!postcss-loader`,
      },
      {
        test: /\.scss$/,
        loader: `css-loader/locals?modules&importLoaders=1&localIdentName=${cssHashPattern}!postcss-loader!sass-loader`,
      },
      ...fontRules,
      ...imageRules,
    ],
  },
  plugins: [
    ExitCodePlugin,
    new webpack.DefinePlugin(buildTimeEnvConfig),
  ],
  resolve: {
    alias: {
      ...UIComponentsAlias(path.resolve(__dirname, '../libs/goustouicomponents'), '', false),
      ...UIComponentsAlias(path.resolve(__dirname, '../libs/goustouicomponents'), '', true),
      spinkit: path.resolve(__dirname, '../node_modules/spinkit'),
      goustouicomponents: path.resolve(__dirname, '../libs/goustouicomponents/src/main'),
      zest: path.resolve(__dirname, '../libs/goustouicomponents/dist'),
    },
    modules: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../src/components'),
      path.resolve('./libs/goustouicomponents/src'),
      path.resolve(__dirname, '../node_modules/spinkit'),
      path.resolve('./node_modules')
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css'],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  externals: [nodeExternals({
    // Workspaces are linked via node_modules, so need whitelisting
    whitelist: [
      /^@features\/.+/
    ]
  })],
  stats: {
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: true,
    warnings: false,
    publicPath: false,
  },
}

if (isDevelopmentBuild) {
  config.devtool = 'source-map'
  config.plugins.push(
    new SimpleProgressWebpackPlugin({ // Default options
      format: 'compact'
    })
  )
} else {
  config.devtool = false
  config.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new TerserPlugin({
      parallel: true,
      sourceMap: true,
      terserOptions: {
        mangle: false,
        compress: true,
        output: {
          comments: false
        },
        warnings: true,
      },
    })
  )
}

const smp = new SpeedMeasurePlugin({
  disable: !process.env.MEASURE
})

module.exports = smp.wrap(config)
