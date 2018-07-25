const ENV_CONFIG = require('./env')
const version = 'v1'
const base = `${ENV_CONFIG.ENDPOINTS.BASE}/content/${version}`

const CONTENT = {
	ROUTES: {
		PAGE: `${base}/pages/slug`,
	},
}

module.exports = CONTENT
