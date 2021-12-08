const fs = require('fs')
const config = require('./config')
const logMessage = require('./log-message')
const generateEntryFiles = require('./generate-entry-files')

const components = Object.keys(generateEntryFiles())

if (!components.length) {
  logMessage('No components to extract in index.js file', 'error')

  return
}

const entryFiles = components.reduce((acc, val) => `${acc}\nexport { ${val} } from './${val}.js'`, '')

fs.writeFileSync(`${config.BUILD_DIRECTORY}/index.js`, entryFiles, 'utf-8')

logMessage(`${components.length} components exported in index.js file`, 'success')
