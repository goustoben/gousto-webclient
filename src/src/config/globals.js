module.exports = {
	client: __CLIENT__,
	server: __SERVER__,
	legacy: () => __CLIENT__ && window.__LEGACY__, // eslint-disable-line no-underscore-dangle
	secure: __CLIENT_PROTOCOL__ === 'https',
	prod: __PROD__,
	env: __ENV__,
	dev: __DEV__,
	domain: __DOMAIN__,
	protocol: __CLIENT_PROTOCOL__,
}
