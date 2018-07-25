module.exports = ({ globalWaitTimeout }) => ({
	globals: {
		waitForConditionTimeout: globalWaitTimeout,
		browser: 'mobile',
	},
	desiredCapabilities: {
		browserName: 'chrome',
		javascriptEnabled: true,
		acceptSslCerts: true
	}
})
