const { canUseWindow } = require('utils/browserEnvironment')

module.exports = {
  legacy: () => canUseWindow() && window.__LEGACY__, // eslint-disable-line no-underscore-dangle
  secure: __CLIENT_PROTOCOL__ === 'https',
  env: __ENV__,
  protocol: __CLIENT_PROTOCOL__,
  service: 'webclient',
}
