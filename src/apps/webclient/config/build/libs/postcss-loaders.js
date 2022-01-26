const PostcssNested = require('postcss-nested')
const PostcssPresetEnv = require('postcss-preset-env')
const PostcssReporter = require('postcss-reporter')
const PostcssFlexbugsFixed = require('postcss-flexbugs-fixes')
const devMode = process.env.NODE_ENV !== 'production'
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

module.exports = {
    cssLoaders,
    scssLoaders
}
