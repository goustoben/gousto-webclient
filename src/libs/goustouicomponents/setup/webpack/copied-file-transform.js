/*
For files that are directly copied through copy-webpack-plugin we want to have the ability of applying various transformations to them. This is needed so that certain plugins (e.g. postcss-nested) will not be required for Zest to work when imported in other repos.
*/
const path = require('path')
const applyPostCSSPlugins = require('./apply-postcss-plugins')

module.exports = (content, absoluteFrom) => {
  const fileExtension = path.extname(absoluteFrom)
  let result = content

  if (fileExtension === '.css') {
    result = applyPostCSSPlugins(content, absoluteFrom)
  }

  return Promise.resolve(result)
}
