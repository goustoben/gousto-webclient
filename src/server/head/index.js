/* eslint-disable global-require */
export default {
	ga: require('./ga').default,
	defaultMeta: require('./defaultMeta').default,
	fbTracking: require('./fbTracking').default,
	gtm: require('./gtm').default,
	pingdom: require('./pingdom').default,
	favicon: require('./favicon').default,
	mobileMeta: require('./mobileMeta').default,
	optimizely: require('./optimizely').default,
}
