'use strict';

const ENV_CONFIG = require('../env');

const CORE = require('../core');

const NOTIFICATION = {
	WIDGET_TYPE: 'white',

	ROUTES: {
		API: {
			USER_ORDERS: CORE.ROUTES.USER_ORDERS,
			SUBSCRIPTION: CORE.ROUTES.SUBSCRIPTION,
			PAYMENT: CORE.ROUTES.PAYMENT,
			DELIVERYDAYS: CORE.ROUTES.DELIVERYDAYS,
			PERIOD_NEXT_MENU: CORE.ROUTES.PERIOD_NEXT_MENU,
		}
	},

	MESSAGES: {
		CARD: {
			EXPIRED: {
				message: 'Your card is expired. Please update now.',
				type: 'warning',
				title: 'Payment Method',
				url: 'my-details',
			},
			TOEXPIRE: {
				message: 'Your card is about to expire soon. Please update now.',
				type: 'warning',
				title: 'Payment Method',
				url: 'my-details',
			},
		},
		AMENDDELIVERY: {
			message: 'Due to the Bank Holiday, we’ve moved your delivery to the next available delivery day.',
			type: 'confirm',
			title: 'Delivery changes',
			url: 'my-deliveries',
		},
		ORDER: {
			message: 'Otherwise our chef will send their best selection.',
			type: 'notify',
			title: 'Choose your recipes for your upcoming order before 12pm.',
			url: 'menu',
		}
	}
};

module.exports = NOTIFICATION;
