/*
This goes over all CSS modules files for each component and maps them to their own value.

This is needed so that they are declared as externals. They will live at the same level with the JS modules, so there's no need for changes in the mapping, it's just taking the path as a key and value so Webpack will not attempt to build them.
*/

const glob = require('glob')
const path = require('path')
const config = require('./config')

module.exports = () => {
  const files = {}
  const CSSModulePaths = glob.sync(`${config.COMPONENTS_DIRECTORY}/**/*.module.css`)

  CSSModulePaths.forEach((CSSModulePath) => {
    const relativePath = `./${path.basename(CSSModulePath)}`

    files[relativePath] = relativePath
  })

  return files
}
