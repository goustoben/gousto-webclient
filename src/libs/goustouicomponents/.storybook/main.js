const path = require('path')
const webpackAlias = require('../setup/webpackAlias')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  addons: [
    '@storybook/addon-docs/preset',
    '@storybook/addon-knobs/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-viewport/register',
    'storybook-mobile/register',
    'storybook-addon-designs/register',
    '@panosvoudouris/addon-versions/register'
  ],
  webpackFinal: async (config, { configType }) => {

    const newRules = config.module.rules.map(rule => {
      const testString = rule.test.toString()
      if (testString.includes('svg')) {
        return {
          ...rule,
          exclude: [
            path.resolve(__dirname, '../src/design-language/icons')
          ]
        }
      }

      if (testString.includes('css')) {
        return {
          test: /\.css$/,
          include: [
            path.resolve(__dirname, '../src'),
            path.resolve(__dirname, '.'),
          ],
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                },
              },
            },
            'postcss-loader',
          ],
        }
      }

      return rule
    })

    newRules.push({
      test: /src\/design-language\/icons\/.*\.svg$/,
      use: ['@svgr/webpack'],
    })

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      })
    )

    const newAlias = {
      ...config.resolve.alias,
      './config': path.resolve('./.storybook'),
      './spinkit/css/spinkit.css': path.resolve('./node_modules/spinkit/css/spinkit.css'),
      ...webpackAlias('.', './', true),
    }

    config.stats = 'verbose'

    config.module.rules = newRules
    config.resolve.alias = newAlias

    return config
  },
}
