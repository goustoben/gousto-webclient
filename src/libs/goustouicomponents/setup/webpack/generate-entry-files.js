/*
  * used for generating the entry files for webpack
  * it returns an object pairing the name of the component (deduced from the name of the directory holding the component) and the path to it
  * result:
    {
      Alert: './src/components/Alert/index.js',
      Button: './src/components/Button/index.js',
      CardContent: './src/components/Card/CardContent/index.js',
      ...
    }
*/

const glob = require('glob')
const path = require('path')

const logMessage = require('./log-message')
const config = require('./config')

const getComponentName = (componentPath) => path.basename(path.dirname(componentPath))

module.exports = () => {
  const componentPaths = glob.sync(`${config.COMPONENTS_DIRECTORY}/**/index.js`)
  const namesAndPaths = {}

  if (!componentPaths.length) {
    logMessage('No paths matching for the entry files', 'error')

    return namesAndPaths
  }

  componentPaths.forEach((componentPath) => {
    namesAndPaths[getComponentName(componentPath)] = componentPath
  })

  logMessage('Components identified and extracted', 'success')

  return namesAndPaths
}
