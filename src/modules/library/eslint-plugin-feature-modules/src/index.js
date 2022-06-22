const { preventImport } = require('./rules/preventImport')

module.exports = {
  rules: {
    'prevent-import': preventImport,
  },
}
