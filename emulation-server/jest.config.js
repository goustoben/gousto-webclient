module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.js?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['__support__']
}
