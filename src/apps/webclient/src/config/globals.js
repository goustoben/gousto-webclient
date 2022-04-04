const { canUseWindow } = require('utils/browserEnvironment')

module.exports = {
  legacy: () => canUseWindow() && window.__LEGACY__, // eslint-disable-line no-underscore-dangle
  env: __ENV__,
  service: 'webclient',
}
