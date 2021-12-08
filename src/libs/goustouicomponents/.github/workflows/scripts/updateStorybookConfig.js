const fs = require('fs')

function findPackageVersion() {
  let PACKAGE_VERSION

  process.argv.forEach((val, index) => {
    if(val.includes('PACKAGE_VERSION')) {
      PACKAGE_VERSION = val.split('=')[1]
    }
  })


  return PACKAGE_VERSION
}

function updateStorybookConfig() {
  const data = JSON.parse(fs.readFileSync('./storybook-config.json', 'utf-8'))

  const PACKAGE_VERSION = findPackageVersion()

  data.storybook.versions.availableVersions.push(PACKAGE_VERSION)

  fs.writeFileSync('./storybook-config.json', JSON.stringify(data), 'utf-8');
}

updateStorybookConfig()
