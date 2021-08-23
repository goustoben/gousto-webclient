const webpack = require('webpack')
const path = require('path')

const ExitCodePlugin = require('../../exitCode')
const ExtractPlugin = require('extract-text-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const { webpackEnvVarsClient, webpackEnvVarsDev } = require('./webpack-env-vars')

const defaultPlugins = (webpackEnvVars) => [
  new ManifestPlugin({ fileName: '../manifest.json', publicPath: '' }),
  new LodashModuleReplacementPlugin(),
  new webpack.DefinePlugin(webpackEnvVars),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // only inlcude moment in English,
]

const productionClientPlugins = [
  new ExtractPlugin({ filename: '[name].[chunkhash].css', allChunks: true, ignoreOrder: true }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new OptimizeCssAssetsPlugin({
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
      preset: [
        'advanced',
        {
          discardComments: { removeAll: true },
          autoprefixer: {
            browsers: [
              'safari >= 7',
              'iOS >= 7',
              'chrome >= 34',
              'and_chr >= 34',
              'android >= 36',
              'explorer >= 11',
              'firefox >= 48',
              'edge >= 13',
              'samsung >= 3.3',
              'opera >= 36',
            ],
          },
          mergeIdents: {
            exclude: true,
          },
          reduceIdents: {
            exclude: true,
          },
          zindex: {
            exclude: true,
          },
        },
      ],
    },
    canPrint: true,
  }),
  new TerserPlugin({
    parallel: true,
    sourceMap: false,
    terserOptions: {
      mangle: true,
      compress: true,
      warnings: false,
      output: {
        comments: false,
      },
    },
  }),
  ExitCodePlugin,
]

const developmentClientPlugins = [
  new SimpleProgressWebpackPlugin({
    format: 'compact'
  }),
]

const developmentHmrClientPlugins = [
  new SimpleProgressWebpackPlugin({
    format: 'compact'
  }),
  
  new ReactRefreshWebpackPlugin({
    overlay: false,
  }),
]

const getClientPlugins = (isDevelopmentBuild = false, isHmrEnabled = false) => {
  const webpackEnvVars = isDevelopmentBuild ? webpackEnvVarsDev : webpackEnvVarsClient
  const hmrToggledDevelopmentClientPlugins = isHmrEnabled ? developmentHmrClientPlugins : developmentClientPlugins 
  
  const buildSpecificPlugins = isDevelopmentBuild
    ? hmrToggledDevelopmentClientPlugins
    : productionClientPlugins
    
  return [...defaultPlugins(webpackEnvVars), ...buildSpecificPlugins]
}

module.exports = {
  getClientPlugins,
}
