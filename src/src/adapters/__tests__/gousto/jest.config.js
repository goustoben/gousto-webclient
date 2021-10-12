// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const defaultJestConfigFilePath = '../../../../jest.config'

// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-dynamic-require
const defaultJestConfig = require(defaultJestConfigFilePath)

const defaultJestConfigRootDir = path.dirname(defaultJestConfigFilePath)

module.exports = {
  ...defaultJestConfig,
  rootDir: defaultJestConfigRootDir,
  testMatch: [`${__dirname}/**/*.test.[jt]s`],
  testPathIgnorePatterns: []
}
