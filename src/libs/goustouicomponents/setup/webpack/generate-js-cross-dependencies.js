/*
Sometimes we reference relative components inside our components (e.g. importing Heading from Alert).

As we don't want webpack bundle to resolve when compiling (because the bundle will be too big), but we want the reference to them to still work, this is mapping the relative component dependencies as externals so that when the dist is flattened the paths still work.

This is resolving up to two levels of relative dependencies.
*/

const glob = require('glob')
const path = require('path')
const config = require('./config')
const logMessage = require('./log-message')

module.exports = () => {
  const componentPaths = glob.sync(`${config.COMPONENTS_DIRECTORY}/**/index.js`)
  const componentNames = []
  const crossDependencies = {}

  if (!componentPaths.length) {
    logMessage('No component paths found', 'error')

    return crossDependencies
  }

  componentPaths.forEach((componentPath) => {
    componentNames.push(path.basename(path.dirname(componentPath)))
  })

  if (!componentNames.length) {
    logMessage('No component names found', 'error')
  }

  componentNames.forEach((componentName) => {
    crossDependencies[`../${componentName}`] = `./${componentName}`
    crossDependencies[`../../${componentName}`] = `./${componentName}`
  })

  logMessage('Cross dependencies externals generated', 'success')

  return crossDependencies
}
