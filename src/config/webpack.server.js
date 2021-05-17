const webpack = require('webpack')
const path = require('path')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const { baseConfig, baseConfig: { module: webpackModuleRules, module: { rules }, plugins }, commonConstants, commonCSSLoader } = require('./webpack/webpack.base')
const logInfo = require('./webpack/logInfo')

logInfo({ mode: 'SERVER' })

const {
  IS_PROD_MODE,
  MEASURE,
  PUBLIC_PATH
} = require('./webpack/config')

const config = {
  ...baseConfig,
  name: 'server',
  target: 'node',
  entry: [
    'babel-polyfill',
    './server/main.js',
  ],
  output: {
    path: path.resolve('./dist'),
    filename: 'server.js',
    publicPath: PUBLIC_PATH,
  },
  module: {
    ...webpackModuleRules,
    rules: [
      ...rules,
      {
        test: /\.css$/,
        use: [
          ...commonCSSLoader,
        ]
      },
      {
        test: /\.scss$/,
        use: [
          ...commonCSSLoader,
          { loader: 'sass-loader' }
        ],
      },
    ]
  },
  plugins: [
    ...plugins,
    new webpack.DefinePlugin({
      ...commonConstants,
      __SERVER__: true,
      __CLIENT__: false,
    }),
  ],
  externals: [nodeExternals()],
}

if (IS_PROD_MODE) {
  config.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new TerserPlugin({
      parallel: true,
      sourceMap: true,
      terserOptions: {
        mangle: false,
        compress: true,
        warnings: true,
        output: {
          comments: false
        },
      },
    })
  )
}

const smp = new SpeedMeasurePlugin({
  disable: !MEASURE
})

module.exports = smp.wrap(config)
