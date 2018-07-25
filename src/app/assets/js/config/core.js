'use strict';

const ENV_CONFIG = require('./env');

const base = ENV_CONFIG.ENDPOINTS.BASE;

const CORE = {
	ROUTES: {
		BASE: base,
		HOLDREASONS: base + '/info/holdreason',
		STOCK_RECIPE: base + '/stock/recipe',
		PRODUCT_STOCK: base + '/products/stock',
		PERIOD: base + '/period',
		DELIVERY_SLOTS: base + '/delivery_slots',
		PERIOD_CURRENT_MENU: base + '/period/current/menu',
		PERIOD_NEXT_MENU: base + '/period/next/menu',
		USER_PROMO_CODES: base + '/user/current/promotion-codes',
		USER_APPLY_PROMO_CODE: base + '/user/current/applyPromotionCode',
		USER_ORDERS: base + '/user/current/orders',
		ORDER_COUNT: base + '/user/current/orders/count',
		CANCEL_PENDING_ORDERS: base + '/user/current/cancel-pending-orders',
		RECIPES: base + '/recipes',
		SUBSCRIPTION: base + '/user/current/subscription',
		LEDGER: base + '/user/current/referralDetails',
		PAYMENT: base + '/user/current/paymentMethod',
		DELIVERYDAYS: base + '/deliveryweek/available_days/',
		ORDER: base + '/order/',
	}
}

module.exports = CORE;
