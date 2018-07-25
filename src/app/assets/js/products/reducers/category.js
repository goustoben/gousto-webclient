'use strict';

const Immutable = require('immutable');

const CONFIG = require('@fe/gousto-config');
const CONSTANTS = CONFIG.PRODUCTS;

var reducers = {
	categories: function(state = Immutable.OrderedMap({}), action) {
		switch (action.type) {
			case CONSTANTS.LOAD_CATEGORY:
				action.categories.forEach((category) => {
					state = state.set(category.id, Immutable.Map(category));
				});
				return state;
				break;
			default:
				return state;
				break;
		}
	},

	productCount: function(state = Immutable.Map({'0': 1}), action) {
		switch (action.type) {
			case CONSTANTS.LOAD_PRODUCT_COUNT:
				state = Immutable.Map({'0': 1});
				let products = Immutable.Iterable.isIterable(action.products) ? action.products : Immutable.List(action.products);
				let stock = Immutable.Iterable.isIterable(action.stock) ? action.stock : Immutable.Map(action.stock);
				products.forEach((product) => {
					product = Immutable.Iterable.isIterable(product) ? product : Immutable.Map(product);
					if (stock.get(product.get('id'), 0) > 0) {
						product.get('categories').forEach((category) => {
							let currentProdCount = state.get(category.id, 0);
							state = state.set(category.id, currentProdCount + 1);
						});
					}
				});

				return state;
				break;
			default:
				return state;
				break;
		}
	},

	selectedCategoryId: function(state = '0', action) {
		switch (action.type) {
			case CONSTANTS.SELECT_CATEGORY:
				return action.id;
				break;
			default:
				return state;
				break;
		}
	}
};

module.exports = reducers;
