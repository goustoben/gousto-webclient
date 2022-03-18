const { canUseWindow } = require('utils/browserEnvironment')

module.exports = {
  legacy: () => canUseWindow() && window.__LEGACY__, // eslint-disable-line no-underscore-dangle
  secure: __CLIENT_PROTOCOL__ === 'https',
  env: __ENV__,
  domain: __DOMAIN__,
  protocol: __CLIENT_PROTOCOL__,
  apiName: __API_ENV__,
  service: 'webclient',
}
