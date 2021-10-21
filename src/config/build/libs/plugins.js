const webpack = require('webpack')
const path = require('path')

const ExitCodePlugin = require('../../exitCode')
const ExtractPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const { webpackEnvVarsClient, webpackEnvVarsDev } = require('./webpack-env-vars')

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
    new webpack.IgnorePlugin(/^@axe-core/),
  ]

  if (process.env.GW_ENABLE_BUNDLE_ANALYZER) {
    result.push(
      new BundleAnalyzerPlugin({ analyzerMode: 'disabled', generateStatsFile: true })
    )
  }

  return result
}

const getDevelopmentClientPlugins = (isHmrEnabled) => {
  const result = [
    new SimpleProgressWebpackPlugin({
      format: 'compact'
    }),
  ]

  if (isHmrEnabled) {
    result.push(new ReactRefreshWebpackPlugin({
      overlay: false,
    }))
  }

  return result
}

const getClientPlugins = (isDevelopmentBuild = false, isHmrEnabled = false) => {
  const webpackEnvVars = isDevelopmentBuild ? webpackEnvVarsDev : webpackEnvVarsClient

  const buildSpecificPlugins = isDevelopmentBuild
    ? getDevelopmentClientPlugins(isHmrEnabled)
    : getProductionClientPlugins()

  return [...getDefaultPlugins(webpackEnvVars), ...buildSpecificPlugins]
}

module.exports = {
  getClientPlugins,
}
