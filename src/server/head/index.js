/* eslint-disable global-require */
export default {
	defaultMeta: require('./defaultMeta').default,
	fbTracking: require('./fbTracking').default,
	gtm: require('./gtm').default,
	pingdom: require('./pingdom').default,
	favicon: require('./favicon').default,
	segment: require('./segment').default,
	mobileMeta: require('./mobileMeta').default,
	optimizely: require('./optimizely').default,
}
