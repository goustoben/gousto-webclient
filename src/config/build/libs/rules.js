const path = require('path')
const ExtractText = require('extract-text-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
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

const typescriptRule = (tsconfigPath = "./tsconfig.json") => ({
  test: /\.ts(x){0,1}$/,
  exclude: /node_modules/,
  use: [
      {
          loader: 'ts-loader',
          options: {
            "configFile": path.resolve(process.cwd(), tsconfigPath),
            logLevel: "error",
            onlyCompileBundledFiles: true,
            /*transpile and typecheck typescript at build time */
            transpileOnly: false
          }
      }
  ],
  include: [path.resolve('./src'), path.resolve('./libs/goustouicomponents/src')],
})

const javascriptRule = (tsconfigPath = "../../../tsconfig.json") => ({
  test: /\.js(x){0,1}$/,
  exclude: /node_modules/,
  use: [
      {
          loader: 'ts-loader',
          options: {
            "configFile": path.resolve(process.cwd(), tsconfigPath),
            logLevel: "error",
            onlyCompileBundledFiles: true,
            /*transpile Javascript but don't typecheck at build time */
            transpileOnly: true
          }
      }
  ],
  include: [path.resolve('./src'), path.resolve('./libs/goustouicomponents/src')],
})

// Favicon and Axiforma fonts are used on the landing pages created through
// Unbounce (cook.gousto.co.uk), accessed by the URL pointing to the
// production-asssets bucket.  The reuse is desirable because we hope the user
// navigates to gousto-webclient right after the LP, and g-w will load a bit
// faster because fonts and icons are already in the browser cache.
const fileLoaderPreservingName = {
  loader: 'file-loader',
  options: {
    name: '[name].[ext]',
  },
}

const fontRules = [
  {
    test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [fileLoaderPreservingName],
  },
  {
    test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [fileLoaderPreservingName],
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
  {
    test: /\.ico$/,
    use: [fileLoaderPreservingName],
  },
  { test: /\.svg$/, loaders: ['svg-url-loader', 'image-webpack'] },
]

const getClientDevtool = (isDevelopmentBuild = false) => isDevelopmentBuild ? false : 'source-map'

const getClientOptimization = (isDevelopmentBuild = false) => ({
  splitChunks: {
    cacheGroups: {
      vendor: {
        chunks: (chunk) => chunk.name !== 'legacy' && chunk.name !== 'performanceTracker',
        name: 'vendors',
        enforce: true,
        test: /[\\/]node_modules[\\/]/,
      },
    },
  },
  // Only minify deployed builds
  ...(!isDevelopmentBuild && {
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: true,
      sourceMap: true,
      terserOptions: {
        mangle: true,
        compress: true,
      },
    })],
  })
})

const combineRules = (tsRule, jsRule, cssRules) => ([
    tsRule,
    jsRule,
    ...cssRules,
    ...fontRules,
    ...imageRules,
  ])

const getClientRules = (tsconfigPath = "./tsconfig.client.json", isDevelopmentBuild = false) => {
  const cssRules = isDevelopmentBuild ? cssDevelopmentRules : cssProductionRules
  return combineRules(typescriptRule(tsconfigPath), javascriptRule(tsconfigPath), cssRules)
}

module.exports = {
  fontRules,
  imageRules,
  getClientDevtool,
  getClientOptimization,
  getClientRules
}
