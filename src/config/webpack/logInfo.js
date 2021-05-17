const config = require('./config')

module.exports = ({ mode }) =>
  console.log(`
=====================================================
  MODE: ${mode}
  NODE_APP_INSTANCE: ${process.env.NODE_APP_INSTANCE}
  NODE_CONFIG_ENV: ${process.env.NODE_CONFIG_ENV}
  ${Object.entries(config)
    .map(([key, value = '']) => {
      return `${key}: ${JSON.stringify(value).substr(0, 100)} \n  `
    })
    .join('')}
=====================================================
`)
