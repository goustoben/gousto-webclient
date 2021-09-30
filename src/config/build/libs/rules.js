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

const typescriptRule = (tsconfigPath = "../../../tsconfig.json") => ({
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

const combineRules = (tsRule, jsRule, cssRules) => ([
    tsRule,
    jsRule,
    ...cssRules,
    ...fontRules,
    ...imageRules,
  ])

const getClientRules = (tsconfigPath = "../tsconfig.client.json", isDevelopmentBuild = false) => {
  const cssRules = isDevelopmentBuild ? cssDevelopmentRules : cssProductionRules
  return combineRules(typescriptRule(tsconfigPath), javascriptRule(tsconfigPath), cssRules)
}

module.exports = {
  getClientRules
}
