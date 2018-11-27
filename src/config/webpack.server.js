const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const ExitCodePlugin = require('./exitCode')

const build = process.env.NODE_ENV || 'development'
const envName = process.env.npm_config_gousto_webclient_environment_name || 'local'
const domain = process.env.npm_config_gousto_webclient_domain || 'gousto.local'
const clientProtocol = process.env.npm_config_gousto_webclient_client_protocol || 'http'
const cloudfrontUrl = process.env.npm_config_gousto_webclient_cloudfront_url || ''
const checkout_pk = process.env.npm_config_gousto_webclient_checkoutcom_pk || ''

const publicPath = cloudfrontUrl ? `${clientProtocol}://${cloudfrontUrl}/build/latest/` : '/nsassets/'
// eslint-disable-next-line no-console
console.log(`================\nSERVER BUILD: ${build}, ENVIRONMENT: ${envName}, DOMAIN: ${domain}, CLIENT PROTOCOL: ${clientProtocol}, PUBLIC PATH: "${publicPath}"\n================`)

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
    './src/goustouicomponents.js',
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
        test: /\.js/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          cache: false,
          quiet: false,
          failOnWarning: false,
          fix: false
        },
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../server'),
        ],
      },
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
      { 	test: /\.ico$/,
        loader: 'file-loader',
      },
      {	test: /\.svg$/,
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
    new webpack.DefinePlugin({
      __DEV__: build === 'development',
      __PROD__: build === 'production',
      __HMR__: build === 'hmr',

      __SERVER__: true,
      __CLIENT__: false,
      __TEST__: false,

      __ENV__: JSON.stringify(envName),
      __DOMAIN__: JSON.stringify(domain),
      __CLIENT_PROTOCOL__: JSON.stringify(clientProtocol),
      __CLOUDFRONT_URL__: JSON.stringify(cloudfrontUrl),
      __CHECKOUT_PK__: JSON.stringify(checkout_pk),
      'process.env.NODE_ENV': JSON.stringify(build),
    }),
  ],
  resolve: {
    alias: {
      spinkit: path.resolve(__dirname, '../node_modules/spinkit'),
    },
    modules: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../src/components'),
      path.resolve(__dirname, '../node_modules/spinkit'),
    ],
    extensions: ['.js', '.json', '.css'],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  externals: [nodeExternals()],
  devtool: 'sourcemap',
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
    new LodashModuleReplacementPlugin(),
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

module.exports = config
