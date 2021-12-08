const path = require('path')

module.exports = {
  ALIASED_DIRECTORIES: ['design-language', 'gousto-config', 'styles'],
  BUILD_DIRECTORY: 'dist',
  BASE_DIRECTORY: path.resolve(__dirname, '../../src'),
  COMPONENTS_DIRECTORY: path.resolve(__dirname, '../../src/components'),
  NPM_EXTERNAL_DEPENDENCIES: {
    'airbnb-prop-types': 'airbnb-prop-types',
    classnames: 'classnames',
    'prop-types': 'prop-types',
    'rc-tooltip': 'rc-tooltip',
    react: 'react',
    'react-dom': 'react-dom',
  },
}
