/*
* used for generating the distribution version of Zest
* this is used only by the CI, no need to use this locally (except for testing purposes)
*/

const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')
const generateEntryFiles = require('./setup/webpack/generate-entry-files')
const config = require('./setup/webpack/config')
const copiedFileTransform = require('./setup/webpack/copied-file-transform')
const externals = require('./setup/webpack/externals')

module.exports = {
  entry: generateEntryFiles(),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, config.BUILD_DIRECTORY),
    libraryTarget: 'umd',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  mode: 'development',
  externals,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.svg/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [config.BUILD_DIRECTORY],
    }),

    new CopyPlugin({
      patterns: [
        {
          from: `${config.COMPONENTS_DIRECTORY}/**/*.module.css`,
          to: './[name].[ext]',
          transform: (content, absoluteFrom) => copiedFileTransform(content, absoluteFrom),
        },
        {
          from: './design-language/**/*',
          to: './',
          globOptions: {
            ignore: ['**/stories.css'],
          },
          context: config.BASE_DIRECTORY,
          transform: (content, absoluteFrom) => copiedFileTransform(content, absoluteFrom),
        },
        {
          from: './gousto-config/**/*',
          to: './',
          globOptions: {
            ignore: ['**/stories.css'],
          },
          context: config.BASE_DIRECTORY,
          transform: (content, absoluteFrom) => copiedFileTransform(content, absoluteFrom),
        },
        {
          from: './styles/**/*',
          to: './',
          globOptions: {
            ignore: ['**/stories.css'],
          },
          context: config.BASE_DIRECTORY,
          transform: (content, absoluteFrom) => copiedFileTransform(content, absoluteFrom),
        },
        {
          from: './hooks/**/*',
          to: './',
          context: config.BASE_DIRECTORY,
        },
        {
          from: './utils/imageUtils.js',
          to: './',
          context: config.BASE_DIRECTORY,
          transform: (content, absoluteFrom) => copiedFileTransform(content, absoluteFrom),
        },
      ],
    }),

    new WebpackShellPlugin({
      onBuildEnd: ['node ./setup/webpack/generate-main-file'],
    }),
  ],
}
