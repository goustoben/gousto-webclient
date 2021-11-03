const webpack = require('webpack')
const path = require('path')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const nodeExternals = require('webpack-node-externals')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ExitCodePlugin = require('./exitCode')
const UIComponentsAlias = require('../libs/goustouicomponents/setup/webpackAlias')

const { webpackEnvVarsServer, cloudfrontUrl, build, clientProtocol } = require('./build/libs/webpack-env-vars.js')
const publicPath = cloudfrontUrl ? `${clientProtocol}://${cloudfrontUrl}/build/latest/` : '/nsassets/'
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
    publicPath
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
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff2',
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      /* {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        // This will apply the loader before the other ones
        enforce: 'pre',
      }, */
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: {
          // Images larger than 10 KB won’t be inlined
          limit: 10 * 1024
        }
      },
      { test: /\.ico$/,
        loader: 'file-loader',
      },
      { test: /\.svg$/,
        loaders: [
          'svg-url-loader',
          'image-webpack-loader',
        ],
      },
    ],
  },
  plugins: [
    ExitCodePlugin,
    new webpack.DefinePlugin(webpackEnvVarsServer),
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
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css'],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  externals: [nodeExternals()],
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
