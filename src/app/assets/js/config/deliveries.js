'use strict';

const ENV_CONFIG = require('./env');

const base = ENV_CONFIG.ENDPOINTS.DELIVERY_SERVICE;

const DELIVERIES = {
	ROUTES: {
		DELIVERY_DAYS: `${base}/days`
	}
}

module.exports = DELIVERIES;
