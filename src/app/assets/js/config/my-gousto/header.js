'use strict';

const CORE = require('../core');

const HEADER = {
	WIDGET_TYPE: 'white',

	ROUTES: {
		API: {
			USER_ORDERS: CORE.ROUTES.USER_ORDERS,
		}
	},
};

module.exports = HEADER;
