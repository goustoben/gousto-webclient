'use strict';

const CORE = require('../core');
const CLIENT = require('../client');

const COOKBOOK = {
	ROUTES: {
		API: {
			USER_ORDERS: CORE.ROUTES.USER_ORDERS,
			COOKBOOK: CLIENT.ROUTES.COOKBOOK,
			RECIPES: CORE.ROUTES.RECIPES,
		}
	},

	IMAGE_SIZES: {
		SMALL: '400',
		MEDIUM: '800',
		LARGE: '1200'
	},

	PLACEHOLDER_IMAGE: 'photos/cookbook-filler.png'
};

module.exports = COOKBOOK;
