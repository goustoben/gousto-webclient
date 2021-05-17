const path = require('path')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const UIComponentsAlias = require('../../libs/goustouicomponents/setup/webpackAlias')

const {
  API_NAME,
  API_TOKEN,
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  BUILD,
  CHECKOUT_PUBLIC_KEY,
  CLIENT_PROTOCOL,
  CLOUDFRONT_URL,
  CSS_HASH_PATTERN_DEV,
  CSS_HASH_PATTERN_PROD,
  DEBUG_CONFIG,
  DOMAIN,
  ENDPOINTS,
  ENV_NAME,
  GIT_HASH,
  IS_DEV_MODE,
  IS_HMR_MODE,
  IS_NON_PROD_MODE,
  IS_PROD_MODE,
  RECAPTCHA_REFERRAL_PUBLIC_KEY,
  RECAPTCHA_REFERRAL_PRIVATE_KEY,
  RUNNING_ENV,
} = require('./config')

const ExitCodePlugin = require('../exitCode')

const commonConstants = {
  __DEV__: IS_DEV_MODE,
  __PROD__: IS_PROD_MODE,
  __HMR__: IS_HMR_MODE,
  __TEST__: false,

  __API_ENV__: JSON.stringify(API_NAME),
  __RUNNING_ENV__: JSON.stringify(RUNNING_ENV),
  __API_TOKEN__: JSON.stringify(API_TOKEN),
  __AUTH_CLIENT_ID__: JSON.stringify(AUTH_CLIENT_ID),
  __AUTH_CLIENT_SECRET__: JSON.stringify(AUTH_CLIENT_SECRET),
  __ENDPOINTS__: JSON.stringify(ENDPOINTS),
  __RECAPTCHA_RAF_PUBK__: JSON.stringify(RECAPTCHA_REFERRAL_PUBLIC_KEY),
  __RECAPTCHA_RAF_PVTK__: JSON.stringify(RECAPTCHA_REFERRAL_PRIVATE_KEY),
  __CHECKOUT_PK__: JSON.stringify(CHECKOUT_PUBLIC_KEY),
  __CLIENT_PROTOCOL__: JSON.stringify(CLIENT_PROTOCOL),
  __CLOUDFRONT_URL__: JSON.stringify(CLOUDFRONT_URL),
  __DOMAIN__: JSON.stringify(DOMAIN),
  __ENV__: JSON.stringify(ENV_NAME),
  __GIT_HASH__: JSON.stringify(GIT_HASH),
  'process.env.NODE_ENV': JSON.stringify(BUILD),
}

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

module.exports = { baseConfig, commonCSSLoader, commonConstants }
