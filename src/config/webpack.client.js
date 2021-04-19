
const webpack = require('webpack')
const path = require('path')
const ExtractPlugin = require('extract-text-webpack-plugin')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")

const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const childProcess = require('child_process')
const TerserPlugin = require('terser-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// POST CSS IMPORT
const PostcssNested = require('postcss-nested')
const PostcssPresetEnv = require('postcss-preset-env')
const PostcssReporter = require('postcss-reporter')
const PostcssFlexbugsFixed = require('postcss-flexbugs-fixes')
const ExitCodePlugin = require('./exitCode')
const UIComponentsAlias = require('../libs/goustouicomponents/setup/webpackAlias')

const nodeConfig = require("node-config");

const apiName = nodeConfig.get('api_name')
const build = nodeConfig.get('build')
const checkout_pk = nodeConfig.get('checkout_pk')
const clientProtocol = nodeConfig.get('client_protocol')
const cloudfrontUrl = nodeConfig.get('cloudfront_url')
const domain = nodeConfig.get('domain')
const envName = nodeConfig.get('environment_name')
const runningEnv = nodeConfig.get('running_env')
const endpoints = nodeConfig.get('endpoints')

const publicPath = cloudfrontUrl ? `${clientProtocol}://${cloudfrontUrl}/build/latest/` : '/nsassets/'
const devMode = process.env.NODE_ENV !== 'production'

const GIT_HASH = `${childProcess.execSync("git rev-parse --short HEAD | tr -d '\n'").toString()}`
const debug = false

// eslint-disable-next-line no-console
console.log(`Printing relevant command line envs, NODE_APP_INSTANCE=${process.env.NODE_APP_INSTANCE}, NODE_CONFIG_ENV=${process.env.NODE_CONFIG_ENV}`)
// eslint-disable-next-line no-console
console.log(`================\nCLIENT BUILD: ${build}, ENVIRONMENT: ${envName}, DOMAIN: ${domain}, CLIENT PROTOCOL: ${clientProtocol}, PUBLIC PATH: "${publicPath}, RUNNING ENVIRONMENT: "${runningEnv}"\n================`)

const cssHashPattern = devMode ? '[name]__[local]___[hash:base64:5]' : 'G[sha1:hash:hex:6]'
const cssLoaders = [
  { loader: `css-loader?modules&-minimize&-sourceMap&importLoaders=1&localIdentName=${cssHashPattern}` },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      sourceMap: false,
      parser: 'postcss-safe-parser',
      plugins: [
        PostcssNested(),
        PostcssPresetEnv(),
        PostcssFlexbugsFixed(),
        PostcssReporter()
      ]
    }
  },
]

const scssLoaders = [
  { loader: `css-loader?modules&-minimize&-sourceMap&importLoaders=1&localIdentName=${cssHashPattern}` },
  { loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      sourceMap: false,
      parser: 'postcss-safe-parser',
      plugins: [
        PostcssNested(),
        PostcssPresetEnv(),
        PostcssFlexbugsFixed(),
        PostcssReporter()
      ],
    },
  },
  { loader: 'sass-loader' }
]

const config = {
  name: 'client',
  mode: build,
  context: path.resolve(__dirname, '..'),
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
    publicPath
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: chunk => chunk.name !== 'legacy',
          name: 'vendors',
          enforce: true,
          test: /[\\/]node_modules[\\/]/
        }
      }
    }
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
          path.resolve('./src'),
          path.resolve('./libs/goustouicomponents/src')
        ]
      },
      {
        test: /\.css$/,
        use: devMode ? ['style-loader', ...cssLoaders] : ExtractPlugin.extract(cssLoaders)
      },
      {
        test: /\.scss$/,
        use: devMode ? ['style-loader', ...scssLoaders] : ExtractPlugin.extract(scssLoaders)
      },
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff2'
      },
      {
        test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      /*  {
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
      {   test: /\.ico$/,
        loader: 'file-loader'
      },
      {   test: /\.svg$/,
        loaders: [
          'svg-url-loader',
          'image-webpack'
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader'
      }
    ]
  },
  plugins: [
    new ManifestPlugin({ fileName: '../manifest.json', publicPath: '' }),
    ExitCodePlugin,
    new LodashModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: build === ('development' || 'hmr'),
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
      __CHECKOUT_PK__: JSON.stringify(checkout_pk),
      'process.env.NODE_ENV': JSON.stringify(build === 'legacy' ? 'production' : build),
      __GIT_HASH__: JSON.stringify(GIT_HASH),
      __ENDPOINTS__: JSON.stringify(endpoints)
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/) // only inlcude moment in English,
  ],
  resolve: {
    alias: {
      ...UIComponentsAlias(path.resolve(__dirname, '../libs/goustouicomponents'), '', false),
      ...UIComponentsAlias(path.resolve(__dirname, '../libs/goustouicomponents'), '', true),
      styles: path.resolve('./src/styles'),
      jsdom: path.resolve('./fallbacks/jsdom'),
      goustouicomponents: path.resolve(__dirname, '../libs/goustouicomponents/src/main'),
      zest: path.resolve(__dirname, '../libs/goustouicomponents/dist'),
    },
    modules: [
      path.resolve('./src'),
      path.resolve('./src/components'),
      path.resolve('./libs/goustouicomponents/src'),
      path.resolve('./node_modules')
    ],
    extensions: ['.js', '.json', '.css', '.scss']
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  node: {
    fs: 'empty'
  },
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
    publicPath: true
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
    publicPath: false
  }
}

if (build === 'development') {
  config.devtool = 'source-map'
  config.plugins.push(
    new SimpleProgressWebpackPlugin({ // Default options
      format: 'compact'
    }),
    new webpack.HotModuleReplacementPlugin()
  )
} else if (build === 'production') {
  config.devtool = false
  config.output.filename = '[name].bundle.[chunkhash].js'
  config.output.chunkFilename = '[name].bundle.[chunkhash].js'

  config.plugins.push(
    new ExtractPlugin({ filename: '[name].[chunkhash].css', allChunks: true, ignoreOrder: true }),
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
} else if (build === 'hmr') {
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
  config.devtool = 'source-map'
}

const smp = new SpeedMeasurePlugin({
  disable: !process.env.MEASURE
})

module.exports = smp.wrap(config)
