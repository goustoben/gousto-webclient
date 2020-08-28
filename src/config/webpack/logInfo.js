const {
  BUILD,
  ENV_NAME,
  DOMAIN,
  CLIENT_PROTOCOL,
  PUBLIC_PATH,
} = require('./config')

// eslint-disable-next-line no-console
module.exports = ({ mode }) => console.log(`
=====================================================
  ${mode} BUILD: ${BUILD}
  ENVIRONMENT: ${ENV_NAME}
  DOMAIN: ${DOMAIN}
  CLIENT PROTOCOL: ${CLIENT_PROTOCOL}
  PUBLIC PATH: ${PUBLIC_PATH}
  NODE_APP_INSTANCE: ${process.env.NODE_APP_INSTANCE}
  NODE_CONFIG_ENV: ${process.env.NODE_CONFIG_ENV}
=====================================================
`)
