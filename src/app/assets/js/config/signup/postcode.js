'use strict';

const DELIVERIES = require('../deliveries');

const POSTCODE = {
	ROUTES: {
		API: {
			DELIVERY_DAYS: DELIVERIES.ROUTES.DELIVERY_DAYS,
		}
	},
	MENU: {
		FLIP_DAY: 3,
		FLIP_TIME: '12:00:00',
		LENGTH: 14
	}
};

module.exports = POSTCODE;
