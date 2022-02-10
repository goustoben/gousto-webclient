module.exports = {
  client: __CLIENT__,
  server: __SERVER__,
  legacy: () => __CLIENT__ && window.__LEGACY__, // eslint-disable-line no-underscore-dangle
  secure: __CLIENT_PROTOCOL__ === 'https',
  prod: __PROD__,
  env: __ENV__,
  domain: __DOMAIN__,
  protocol: __CLIENT_PROTOCOL__,
  apiName: __API_ENV__,
  service: 'webclient'
}
