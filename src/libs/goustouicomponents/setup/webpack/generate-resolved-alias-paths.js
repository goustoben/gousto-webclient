/*
This goes over all files from aliased directories (e.g. design-language) and flattens the dependency from the alias (e.g. 'design-language/typography.module.css) to the relative path (e.g. './design-language/typography.module.css').

This is needed as the module CSS files will remain untouched and set to be external dependencies.
*/

const glob = require('glob')
const path = require('path')
const config = require('./config')

module.exports = () => {
  const files = {}

  config.ALIASED_DIRECTORIES.forEach((aliasedDirectory) => {
    const aliasedDirectoryFiles = glob.sync(`${config.BASE_DIRECTORY}/${aliasedDirectory}/**/*`, {
      ignore: ['**/*.stories.*', '**/icons/*.svg'],
    })

    aliasedDirectoryFiles.forEach((aliasedDirectoryFile) => {
      const relativePath = path.relative(config.BASE_DIRECTORY, aliasedDirectoryFile)

      if (path.basename(aliasedDirectoryFile) === 'index.js') {
        /*
          This is needed for the import of index.js files.
          For example, when importing gousto-config/index.js, the `index.js` is optional, but the alias would not resolve as a directory, so we need to create a manual alias between them.
        */
        files[path.dirname(relativePath)] = `./${relativePath}`
      }

      files[relativePath] = `./${relativePath}`
    })
  })

  return files
}
