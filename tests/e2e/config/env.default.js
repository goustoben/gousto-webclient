module.exports = ({ ARTIFACTS_PATH = './screenshots', globalWaitTimeout }) => ({
	globals: {
		waitForConditionTimeout: globalWaitTimeout
	},
	request_timeout_options: {
		timeout: 15000,
		retry_attempts: 3
	},
	screenshots: {
		enabled: true,
		path: ARTIFACTS_PATH,
		on_failure: true,
		on_error: true
	},
	selenium_port: 4444,
	silent: true
})
