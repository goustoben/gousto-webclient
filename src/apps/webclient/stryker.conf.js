const { jestConfig } = require('./jest.config')

module.exports = {
  tempDirName: 'strykerTmp',
  timeoutMS: 60000,
  concurrency: 6,
  mutate: [
    'src/routes/Account/**/*.js',
    'src/routes/BoxPrices/**/*.js',
    // 'src/routes/Checkout/**/*.js',
    // 'src/routes/GetHelp/**/*.js',
    // 'src/routes/Home/**/*.js',
    // 'src/routes/Menu/**/*.js',
    '!**/*.test.js',
    '!**/*.spec.js',
    '!**/routes/**/__tests__/**/[^.]*.(j|t)s?(x)',
  ],  
  testRunner: 'jest',
  reporters: ['progress', 'clear-text', 'html'],
  coverageAnalysis: 'perTest',
  thresholds: {
    high: 80,
    low: 60,
  },
  jest: {
    config: jestConfig,
    enableFindRelatedTests: true
  }
}
