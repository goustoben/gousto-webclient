'use strict';

const ENV_CONFIG = require('../env');

const CORE = require('../core');

const FEATURED_RECIPES = {
	ROUTES: {
		API: {
			PERIOD_CURRENT_MENU: CORE.ROUTES.PERIOD_CURRENT_MENU,
			PERIOD_NEXT_MENU: CORE.ROUTES.PERIOD_NEXT_MENU,
			USER_ORDERS: CORE.ROUTES.USER_ORDERS,
			RECIPES: CORE.ROUTES.RECIPES,
			SUBSCRIPTION: CORE.ROUTES.SUBSCRIPTION,
		}
	},

	TYPE: {
		HEALTHY: {
			LABEL: 'Lowest Calorie',
			ICON: 'icon-flame'
		},
		QUICK: {
			LABEL: 'Quickest',
			ICON: 'icon-clock2'
		},
		POPULAR: {
			LABEL: 'Most Popular',
			ICON: 'icon-star2'
		}
	},

	IMAGE_SIZES: {
		SMALL: '400',
		MEDIUM: '800',
		LARGE: '1200'
	}
};

module.exports = FEATURED_RECIPES;
