'use strict';

const Gousto = require('@fe/gousto-generic');
const CONFIG = require('@fe/gousto-config');
const CONSTANTS = CONFIG.PRODUCTS;

const Immutable = require('immutable');

const actionUtils = {
	loadStateData: function (url, cb) {
		Gousto.ajaxCall(url, 'GET', {}, cb);
	},

	loadStateDataPromise: function (url, options) {
		return Gousto.ajaxPromise(url, 'GET', options);
	},

	categoryLimitReached: function(productId, userChoices, products, categories) {
		let limitReaced = false;
		products.getIn([productId, 'categories']).some((category) => {
			let boxLimit = categories.getIn([category.id, 'box_limit'], null);
			if (boxLimit !== null) {
				var productsInCategory = userChoices.filter((productItems, id) => {
					return Boolean(products.getIn([id, 'categories']).filter((productCategory) => {
						return productCategory.id === category.id;
					}).length);
				});
				let sum = productsInCategory.reduce((sum, productItems) => {
					return sum += productItems.reduce((sum, productItem) => {
						return sum += productItem.get('qty');
					}, 0);
				}, 0);

				if (sum > boxLimit) {
					limitReaced = categories.getIn([category.id, 'title'], '');
					return;
				}
			}
		});

		return limitReaced;
	},

	boxLimitReached: function(userChoices, giftChoices) {
		let boxSum = userChoices.reduce((sum, productItems) => {
			return sum + productItems.reduce((productSum, productItem) => {
				return productSum + productItem.get('qty');
			}, 0);
		}, 0);

		boxSum += giftChoices.reduce((sum, giftItem) => {
			return sum + giftItem.get('qty');
		}, 0);

		return (boxSum > CONSTANTS.OVERALL_BOX_LIMIT) ? true : false;
	},

	checkLimitReached: function(delta, productId, state) {
		let productSum = 0;
		if (state.userChoices.has(productId)) {
			productSum = state.userChoices.get(productId).reduce((productSum, productItem) => {
				return productSum + productItem.get('qty');
			}, 0);
		}
		productSum += delta;

		let tempUserChoices = state.userChoices.set(productId, Immutable.Map({}).setIn(['_temp_', 'qty'], productSum));

		let products = state.products;
		let categories = state.categories;

		if (productSum > state.stock.get(productId)) {
			return 'Sorry, we don\'t have any more in stock';
		}

		if (this.boxLimitReached(tempUserChoices, state.userGifts)) {
			return 'Sorry, we can\'t fit anymore items in your box';
		}

		if (state.userGifts.has(productId)) {
			productSum += state.userGifts.getIn([productId, 'qty']);
		}

		tempUserChoices = state.userChoices.set(productId, Immutable.Map({}).setIn(['_temp_', 'qty'], productSum));

		let categoryName = this.categoryLimitReached(productId, tempUserChoices, products, categories);
		if (categoryName !== false) {
			return 'Sorry, we can\'t fit anymore "' + categoryName + '" items in your box';
		}

		let individualBoxLimit = state.products.getIn([productId, 'box_limit'], null);
		if (individualBoxLimit !== null && productSum > individualBoxLimit) {
			return 'Sorry, we can\'t fit anymore of this item in your box';
		}

		return false;
	}
}

module.exports = actionUtils;
