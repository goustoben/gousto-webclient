const path = require('path')
const ExtractText = require('extract-text-webpack-plugin')
const { cssLoaders, scssLoaders } = require('./postcss-loaders')

const cssProductionRules = [
    {
        test: /\.css$/,
        use: ExtractText.extract(cssLoaders),
      },
      {
        test: /\.scss$/,
        use: ExtractText.extract(scssLoaders),
      },
]

const cssDevelopmentRules = [
    {
        test: /\.css$/,
        use: ['style-loader', ...cssLoaders]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', ...scssLoaders]
      },
]

const javascriptProductionRule = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
      {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
      }
  ],
  include: [path.resolve('./src'), path.resolve('./libs/goustouicomponents/src')],
}

const javascriptDevelopmentRule = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
      {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
      }
  ],
  include: [path.resolve('./src'), path.resolve('./libs/goustouicomponents/src')],
}

const javascriptDevelopmentRuleWithReactRefresh = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
      {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: [
              require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          }
      }
  ],
  include: [path.resolve('./src'), path.resolve('./libs/goustouicomponents/src')],
}

const fontRules = [
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
    loader: 'file-loader',
  },
]

const imageRules = [
  {
    test: /\.(jpe?g|png|gif)$/,
    loader: 'url-loader',
    options: {
      // Images larger than 10 KB won’t be inlined
      limit: 10 * 1024,
    },
  },
  { test: /\.ico$/, loader: 'file-loader' },
  { test: /\.svg$/, loaders: ['svg-url-loader', 'image-webpack'] },
]

const combineRules = (jsRule, cssRules) => ([
    jsRule,
    ...cssRules,
    ...fontRules,
    ...imageRules,
  ])

const getClientRules = (isDevelopmentBuild = false, isHmrEnabled = false) => {
  const cssRules = isDevelopmentBuild ? cssDevelopmentRules : cssProductionRules
  const developmentJavascriptRule = isHmrEnabled ? javascriptDevelopmentRuleWithReactRefresh : javascriptDevelopmentRule
  const javascriptRule = isDevelopmentBuild ? developmentJavascriptRule : javascriptProductionRule
  return combineRules(javascriptRule, cssRules)
}

module.exports = {
  getClientRules
}
