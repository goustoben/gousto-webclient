/*
Items on the external list will not be bundled with the distributed component. Files like CSS or generic mandatory dependencies (React) should be set as externals so the bundle size is as small as possible.
*/
const config = require('./config')
const generateResolvedAliasPaths = require('./generate-resolved-alias-paths')
const generateCSSModulesRelativePaths = require('./generate-css-modules-relative-paths')
const generateJSCrossDependencies = require('./generate-js-cross-dependencies')

module.exports = {
  ...config.NPM_EXTERNAL_DEPENDENCIES,
  ...generateResolvedAliasPaths(),
  ...generateCSSModulesRelativePaths(),
  ...generateJSCrossDependencies(),
}
