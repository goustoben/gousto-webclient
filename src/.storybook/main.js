const webClientWebpackConfig = require('../config/webpack.client');
const webpack = require('webpack')

module.exports = {
  stories: ['../src/**/*.stories.@(js|mdx|ts)*(x)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',

  webpackFinal: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        ...webClientWebpackConfig.resolve.alias,
      },
      modules: [...config.resolve.modules, ...webClientWebpackConfig.resolve.modules],
    },
    module: {
      ...config.module,
      rules: webClientWebpackConfig.module.rules,
    },
    resolveLoader: {
      ...config.resolveLoader,
      moduleExtensions: webClientWebpackConfig.resolveLoader.moduleExtensions,
    },
    plugins: [
      // Indicate that the build is done under Storybook environment
      new webpack.DefinePlugin({
        __STORYBOOK__: true,
      }),
      ...(config.plugins || []),
      ...webClientWebpackConfig.plugins,
    ]
  }),
}
