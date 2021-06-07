const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const ExitCodePlugin = require('./exitCode')
const nodeConfig = require("node-config");

const apiName = nodeConfig.get('api_name')
const build = 'development'
const clientProtocol = nodeConfig.get('client_protocol')
const cloudfrontUrl = nodeConfig.get('cloudfront_url')
const domain = nodeConfig.get('domain')
const envName = nodeConfig.get('environment_name')
const runningEnv = nodeConfig.get('running_env')
const endpoints = nodeConfig.get('endpoints')
// This probably isn't used considering e2e.js imports a very limited subset of webclient to help it form api request urls. But this can be confirmed and tidied up later.
const publicPath = cloudfrontUrl ? `${clientProtocol}://${cloudfrontUrl}/build/latest/` : '/nsassets/'

// eslint-disable-next-line no-console
console.log(`Printing relevant command line envs, NODE_APP_INSTANCE=${process.env.NODE_APP_INSTANCE}, NODE_CONFIG_ENV=${process.env.NODE_CONFIG_ENV}`)
// eslint-disable-next-line no-console
console.log(`================\nCLIENT BUILD: ${build}, ENVIRONMENT: ${envName}, POINTING TO API ENVIRONMENT: ${apiName}, DOMAIN: ${domain}, CLIENT PROTOCOL: ${clientProtocol}, PUBLIC PATH: "${publicPath}, RUNNING ENVIRONMENT: "${runningEnv}"\n================`)

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
      { test: /\.jpg$/,
        loader: 'file-loader',
      },
      { test: /\.gif$/,
        loader: 'file-loader',
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
    new webpack.DefinePlugin({
      __DEV__: build === 'development',
      __PROD__: build === 'production',
      __HMR__: build === 'hmr',

      __SERVER__: false,
      __CLIENT__: true,
      __TEST__: false,

      __ENV__: JSON.stringify(envName),
      __API_ENV__: JSON.stringify(apiName),
      __RUNNING_ENV__: JSON.stringify(runningEnv),
      __DOMAIN__: JSON.stringify(domain),
      __CLIENT_PROTOCOL__: JSON.stringify(clientProtocol),
      __CLOUDFRONT_URL__: JSON.stringify(cloudfrontUrl),
      __ENDPOINTS__: JSON.stringify(endpoints),
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

const smp = new SpeedMeasurePlugin({
  disable: !process.env.MEASURE
})

module.exports = smp.wrap(config)
