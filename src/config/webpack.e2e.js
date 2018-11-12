const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const ExitCodePlugin = require('./exitCode')

// let build = 'production'
let build = 'development'
let envName = 'staging'
let domain = 'gousto.info'
let clientProtocol = 'https'
let cloudfrontUrl = '/'
let publicPath = '/'

if (process.env.NODE_ENV === 'local') {
  build = 'development'
  envName = 'local'
  domain = 'gousto.local'
  clientProtocol = 'http'
  cloudfrontUrl = ''
  publicPath = '/nsassets/'
}

// eslint-disable-next-line no-console
console.log(`================\nE2E BUILD: ${build}, ENVIRONMENT: ${envName}, DOMAIN: ${domain}, CLIENT PROTOCOL: ${clientProtocol}, PUBLIC PATH: "${publicPath}"\n================`)

const config = {
  mode: build,
  context: path.resolve(__dirname, '..'),
  target: 'node',
  entry: [
    'babel-polyfill',
    './src/e2e.js',
  ],
  output: {
    path: path.resolve('./dist'),
    filename: 'webclient.js',
    publicPath,
    library: 'e2e',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../server'),
        ],
      },
      {
        test: /\.css$/,
        loader: 'css-loader/locals?modules&importLoaders=0&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
      },

      {
        test: /\.scss$/,
        loader: 'css-loader/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader',
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
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000',
      },
      {	test: /\.jpg$/,
        loader: 'file-loader',
      },
      { 	test: /\.gif$/,
        loader: 'file-loader',
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
    new webpack.DefinePlugin({
      __DEV__: build === 'development',
      __PROD__: build === 'production',
      __HMR__: build === 'hmr',

      __SERVER__: false,
      __CLIENT__: true,
      __TEST__: false,

      __ENV__: JSON.stringify(envName),
      __DOMAIN__: JSON.stringify(domain),
      __CLIENT_PROTOCOL__: JSON.stringify(clientProtocol),
      __CLOUDFRONT_URL__: JSON.stringify(cloudfrontUrl),
      'process.env.NODE_ENV': JSON.stringify(build),
    }),
    // new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false }),
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../src/components'),
    ],
    extensions: ['.js', '.json', '.css'],
  },
  externals: [nodeExternals()],
  // devtool: 'sourcemap',
}

if (build === 'development') {
  // config.devtool = 'source-map'
} else if (build === 'production') {
  config.plugins.push(ExitCodePlugin)
}

module.exports = config
