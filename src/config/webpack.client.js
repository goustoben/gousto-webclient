const webpack = require('webpack')
const path = require('path')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { baseConfig, baseConfig: { module: webpackModuleRules, module: { rules } }, commonCSSLoader } = require('./webpack/webpack.base')
const logInfo = require('./webpack/logInfo')

logInfo({ mode: 'CLIENT' })

const { MEASURE } = process.env
const {
  API_NAME,
  BUILD,
  CHECKOUT_PK,
  CLIENT_PROTOCOL,
  DOMAIN,
  ENV_NAME,
  GIT_HASH,
  IS_DEV_MODE,
  IS_HMR_MODE,
  IS_NON_PROD_MODE,
  IS_PROD_MODE,
  PUBLIC_PATH,
  RUNNING_ENV,
  ENDPOINTS,
  RECAPTCHA_REFERRAL_PUBLIC_KEY
} = require('./webpack/config')

const config = {
  ...baseConfig,
  name: 'client',
  target: 'web',
  entry: {
    main: [
      'babel-polyfill',
      './src/client.js',
    ],
    legacy: [
      'babel-polyfill',
      './src/legacy.js'
    ],
  },
  output: {
    path: path.resolve('./public'),
    filename: '[name].bundle.js',
    publicPath: PUBLIC_PATH,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: chunk => chunk.name !== 'legacy',
          name: 'vendors',
          enforce: true,
          test: /[\\/]node_modules[\\/]/
        },
      },
    },
  },
  module: {
    ...webpackModuleRules,
    rules: [
      ...rules,
      {
        test: /\.css$/,
        use: [
          IS_NON_PROD_MODE ? 'style-loader' : MiniCssExtractPlugin.loader,
          ...commonCSSLoader,
        ]
      },
      {
        test: /\.scss$/,
        use: [
          IS_NON_PROD_MODE ? 'style-loader' : MiniCssExtractPlugin.loader,
          ...commonCSSLoader,
          { loader: 'sass-loader' }
        ],
      },
    ]
  },
  node: {
    fs: 'empty',
  },
}

config.plugins.push(
  new ManifestPlugin({ fileName: '../manifest.json', publicPath: '' }),
  new webpack.DefinePlugin({
    __DEV__: IS_DEV_MODE,
    __PROD__: IS_PROD_MODE,
    __HMR__: BUILD === 'hmr',

    __SERVER__: false,
    __CLIENT__: true,
    __TEST__: false,

    __ENV__: JSON.stringify(ENV_NAME),
    __API_ENV__: JSON.stringify(API_NAME),
    __RUNNING_ENV__: JSON.stringify(RUNNING_ENV),
    __DOMAIN__: JSON.stringify(DOMAIN),
    __CLIENT_PROTOCOL__: JSON.stringify(CLIENT_PROTOCOL),
    __CHECKOUT_PK__: JSON.stringify(CHECKOUT_PK),
    __RECAPTCHA_RAF_PUBK__: JSON.stringify(RECAPTCHA_REFERRAL_PUBLIC_KEY),
    'process.env.NODE_ENV': JSON.stringify(BUILD === 'legacy' ? 'production' : BUILD),
    __GIT_HASH__: JSON.stringify(GIT_HASH),
    __ENDPOINTS__: JSON.stringify(ENDPOINTS)
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/) // only inlcude moment in English,
)

if (IS_PROD_MODE) {
  config.output.filename = '[name].bundle.[chunkhash].js'
  config.output.chunkFilename = '[name].bundle.[chunkhash].js'

  config.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new TerserPlugin({
      parallel: true,
      sourceMap: false,
      terserOptions: {
        mangle: true,
        compress: true,
        warnings: true,
        output: {
          comments: false
        }
      }
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['advanced',
          {
            discardComments: { removeAll: true },
            autoprefixer: {
              browsers: ["safari >= 7", "iOS >= 7", "chrome >= 34", "and_chr >= 34", "android >= 36", "explorer >= 11", "firefox >= 48", "edge >= 13", "samsung >= 3.3", "opera >= 36"]
            },
            mergeIdents: {
              exclude: true
            },
            reduceIdents: {
              exclude: true
            },
            zindex: {
              exclude: true
            }
          }
        ]
      },
      canPrint: true
    })
  )
}

if (IS_DEV_MODE) {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  )
}

if (IS_HMR_MODE) {
  config.output.publicPath = 'http://localhost:3001/'

  config.entry.unshift('webpack-dev-server/client?http://localhost:3001', 'webpack/hot/only-dev-server')

  config.module.rules[0].loaders.unshift('react-hot-loader')
  config.module.rules.push(
    {
      test: /\.css$/,
      loaders: [
        'style?sourceMap',
        'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
      ],
    }
  )

  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

const smp = new SpeedMeasurePlugin({
  disable: !MEASURE
})

module.exports = smp.wrap(config)
