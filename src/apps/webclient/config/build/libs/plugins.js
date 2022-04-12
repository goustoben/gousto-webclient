const webpack = require('webpack')
const path = require('path')

const ExitCodePlugin = require('../../exitCode')
const ExtractPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const { webpackEnvVarsClient, webpackEnvVarsDev } = require('./build-time-config')

const getDefaultPlugins = (webpackEnvVars) => [
  new ManifestPlugin({ fileName: '../manifest.json', publicPath: '' }),
  new webpack.DefinePlugin(webpackEnvVars),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // only include moment in English
]

const getProductionClientPlugins = () => {
  const result = [
    new ExtractPlugin({ filename: '[name].[chunkhash].css', allChunks: true, ignoreOrder: true }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: [
          'advanced',
          {
            discardComments: { removeAll: true },
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
    ExitCodePlugin,
    new webpack.IgnorePlugin(/^@axe-core/),
  ]

  if (process.env.GW_ENABLE_BUNDLE_ANALYZER) {
    result.push(new BundleAnalyzerPlugin({ analyzerMode: 'disabled', generateStatsFile: true }))
  }

  return result
}

const getDevelopmentClientPlugins = () => {
  return [
    new SimpleProgressWebpackPlugin({
      format: 'compact',
    }),
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
  ]
}

const getClientPlugins = (isDevelopmentBuild = false) => {
  const webpackEnvVars = isDevelopmentBuild ? webpackEnvVarsDev : webpackEnvVarsClient

  const buildSpecificPlugins = isDevelopmentBuild
    ? getDevelopmentClientPlugins()
    : getProductionClientPlugins()

  return [...getDefaultPlugins(webpackEnvVars), ...buildSpecificPlugins]
}

module.exports = {
  getClientPlugins,
}
