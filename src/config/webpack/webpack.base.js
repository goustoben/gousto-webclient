const path = require('path')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const UIComponentsAlias = require('../../libs/goustouicomponents/setup/webpackAlias')

const {
  BUILD,
  CSS_HASH_PATTERN_DEV,
  CSS_HASH_PATTERN_PROD,
  DEBUG_CONFIG,
  IS_NON_PROD_MODE,
  IS_DEV_MODE,
} = require('./config')

const ExitCodePlugin = require('../exitCode')

const commonCSSLoader = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules: {
        localIdentName: (IS_NON_PROD_MODE ? CSS_HASH_PATTERN_DEV : CSS_HASH_PATTERN_PROD),
      },
    },
  },
  'postcss-loader',
]

const baseConfig = {
  mode: BUILD,
  context: path.resolve(__dirname, '../../'),
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
          path.resolve(__dirname, '../../src'),
          path.resolve(__dirname, '../../server'),
          path.resolve('./libs/goustouicomponents/src')
        ],
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
        test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: {
          // Images larger than 10 KB won’t be inlined
          limit: 10 * 1024
        }
      },
      {
        test: /\.ico$/,
        loader: 'file-loader'
      },
      {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader'
      },
      {
        test: /\.svg$/,
        loaders: [
          'svg-url-loader',
          'image-webpack-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      ...UIComponentsAlias(path.resolve(__dirname, '../../libs/goustouicomponents'), '', false),
      ...UIComponentsAlias(path.resolve(__dirname, '../../libs/goustouicomponents'), '', true),
      styles: path.resolve('./src/styles'),
      jsdom: path.resolve('./fallbacks/jsdom'),
      goustouicomponents: path.resolve(__dirname, '../../libs/goustouicomponents/src/main'),
      zest: path.resolve(__dirname, '../../libs/goustouicomponents/dist'),
    },
    modules: [
      path.resolve('./src'),
      path.resolve('./src/components'),
      path.resolve('./libs/goustouicomponents/src'),
      path.resolve('./node_modules')
    ],
    extensions: ['.js', '.json', '.css', '.scss']
  },
  plugins: [
    ExitCodePlugin,
    new LodashModuleReplacementPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].[chunkhash].css', ignoreOrder: true }),
  ],
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  stats: DEBUG_CONFIG,
}

if (IS_DEV_MODE) {
    baseConfig.devtool = 'source-map'

    baseConfig.plugins.push(
      new SimpleProgressWebpackPlugin({ // Default options
        format: 'compact'
      })
    )
  }

module.exports = { baseConfig, commonCSSLoader }
