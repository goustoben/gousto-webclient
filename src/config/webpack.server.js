const webpack = require('webpack')
const path = require('path')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const nodeExternals = require('webpack-node-externals')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const ExitCodePlugin = require('./exitCode')
const UIComponentsAlias = require('../libs/goustouicomponents/setup/webpackAlias')

const nodeConfig = require("node-config");

const apiName = nodeConfig.get('api_name')
const apiToken = nodeConfig.get('api_token')
const authClientId = nodeConfig.get('auth_client_id')
const authClientSecret = nodeConfig.get('auth_client_secret')
const build = nodeConfig.get('build')
const checkout_pk = nodeConfig.get('checkout_pk')
const clientProtocol = nodeConfig.get('client_protocol')
const cloudfrontUrl = nodeConfig.get('cloudfront_url')
const domain = nodeConfig.get('domain')
const envName = nodeConfig.get('environment_name')
const runningEnv = nodeConfig.get('running_env')
const endpoints = nodeConfig.get('endpoints')

const publicPath = cloudfrontUrl ? `${clientProtocol}://${cloudfrontUrl}/build/latest/` : '/nsassets/'
// eslint-disable-next-line no-console
console.log(`Printing relevant command line envs, NODE_APP_INSTANCE=${process.env.NODE_APP_INSTANCE}, NODE_CONFIG_ENV=${process.env.NODE_CONFIG_ENV}`)
// eslint-disable-next-line no-console
console.log(`================\nCLIENT BUILD: ${build}, ENVIRONMENT: ${envName}, POINTING TO API ENVIRONMENT: ${apiName}, DOMAIN: ${domain}, CLIENT PROTOCOL: ${clientProtocol}, PUBLIC PATH: "${publicPath}, RUNNING ENVIRONMENT: "${runningEnv}"\n================`)

const debug = false

const devMode = process.env.NODE_ENV !== 'production'
const cssHashPattern = devMode ? '[name]__[local]___[hash:base64:5]' : 'G[sha1:hash:hex:6]'

const config = {
  name: 'server',
  mode: build,
  context: path.resolve(__dirname, '..'),
  target: 'node',
  entry: [
    'babel-polyfill',
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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../server'),
          path.resolve(__dirname, '../libs/goustouicomponents/src'),
        ],
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
      {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
  plugins: [
    ExitCodePlugin,
    new LodashModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: build === 'development',
      __PROD__: build === 'production',
      __HMR__: build === 'hmr',

      __SERVER__: true,
      __CLIENT__: false,
      __TEST__: false,

      __API_ENV__: JSON.stringify(apiName),
      __RUNNING_ENV__: JSON.stringify(runningEnv),
      __API_TOKEN__: JSON.stringify(apiToken),
      __AUTH_CLIENT_ID__: JSON.stringify(authClientId),
      __AUTH_CLIENT_SECRET__: JSON.stringify(authClientSecret),
      __CHECKOUT_PK__: JSON.stringify(checkout_pk),
      __CLIENT_PROTOCOL__: JSON.stringify(clientProtocol),
      __CLOUDFRONT_URL__: JSON.stringify(cloudfrontUrl),
      __DOMAIN__: JSON.stringify(domain),
      __ENV__: JSON.stringify(envName),
      __ENDPOINTS__: JSON.stringify(endpoints),
      'process.env.NODE_ENV': JSON.stringify(build),
    }),
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
    extensions: ['.js', '.json', '.css'],
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
