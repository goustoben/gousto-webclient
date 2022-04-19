const webpack = require('webpack')
const path = require('path')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const nodeExternals = require('webpack-node-externals')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ExitCodePlugin = require('./exitCode')
const { fontRules, imageRules } = require('./build/libs/rules')
const UIComponentsAlias = require('../libs/goustouicomponents/setup/webpackAlias')

const { webpackEnvVarsServer, build, publicPath } = require('./build/libs/webpack-env-vars.js')
const debug = false
const devMode = process.env.NODE_ENV !== 'production'
const cssHashPattern = devMode ? '[name]__[local]___[hash:base64:5]' : 'G[sha1:hash:hex:6]'
const { logBuildInfo } = require('./build/libs/logs')

const isDevelopmentBuild = build === 'development'
logBuildInfo(isDevelopmentBuild)

const config = {
  name: 'server',
  mode: build,
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
    new webpack.DefinePlugin(webpackEnvVarsServer),
    {
      apply(compiler) {
        compiler.hooks.beforeRun.tapAsync('LogEntireWebpackConfig', function (compiler, callback) {
          console.log(`
          +++++++++++++++++++++
          SERVER WEBPACK CONFIG:
          +++++++++++++++++++++
          `)
          console.log(JSON.stringify(compiler.options, null, 4))
          callback()
        })
      },
    },
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
  stats: debug ? {
    hash: true,
    version: true,
    timings: true,
    assets: true,
    chunks: true,
    modules: true,
    reasons: true,
    children: true,
    source: true,
    errors: true,
    errorDetails: true,
    warnings: true,
    publicPath: true,
  } : {
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

if (build === 'development') {
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
