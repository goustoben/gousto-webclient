const webpack = require('webpack')
const path = require('path')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const { baseConfig, baseConfig: { module: webpackModuleRules, module: { rules } }, commonCSSLoader } = require('./webpack/webpack.base')
const logInfo = require('./webpack/logInfo')

logInfo({ mode: 'SERVER' })

const { MEASURE } = process.env
const {
  API_NAME,
  API_TOKEN,
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  BUILD,
  CHECKOUT_PUBLIC_KEY,
  CLIENT_PROTOCOL,
  CLOUDFRONT_URL,
  DOMAIN,
  ENV_NAME,
  IS_DEV_MODE,
  IS_PROD_MODE,
  PUBLIC_PATH,
  RUNNING_ENV,
  ENDPOINTS,
  RECAPTCHA_REFERRAL_PUBLIC_KEY,
  RECAPTCHA_REFERRAL_PRIVATE_KEY
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
  externals: [nodeExternals()],
}

config.plugins.push(
  new webpack.DefinePlugin({
    __DEV__: IS_DEV_MODE,
    __PROD__: IS_PROD_MODE,
    __HMR__: BUILD === 'hmr',
    __SERVER__: true,
    __CLIENT__: false,
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
    'process.env.NODE_ENV': JSON.stringify(BUILD),
  }),
)

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
