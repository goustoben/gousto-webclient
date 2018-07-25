'use strict';

const Immutable = require('immutable');

const CONFIG = require('@fe/gousto-config');
const CONSTANTS = CONFIG.PRODUCTS;

var reducers = {
	products: function(state = Immutable.OrderedMap({}), action) {
		switch (action.type) {
			case CONSTANTS.LOAD_PRODUCT:
				action.products.forEach((product) => {
					state = state.set(product.id, Immutable.Map(product));
					state = state.setIn([product.id, 'price'], product.list_price);
					state = state.setIn([product.id, 'limitReached'], false);
					state = state.deleteIn([product.id, 'list_price']);
				});
				return state;
				break;
			case CONSTANTS.CAN_ADD_MORE:
				action.data.forEach((product) => {
					state = state.setIn([product.id, 'limitReached'], product.limitReached);
				});
				return state;
				break;
			default:
				return state;
		}
	},

	stock: function(state = Immutable.Map({}), action) {
		switch (action.type) {
			case CONSTANTS.LOAD_STOCK:
				Object.keys(action.stock).forEach((product_id) => {
					let qty = state.get(product_id, 0);
					state = state.set(product_id, qty + action.stock[product_id]);
				});
				return state;
				break;
			default:
				return state;
		}
	},

	userChoices: function(state = Immutable.Map({}), action) {
		switch (action.type) {
			case CONSTANTS.INCREMENT_PRODUCT:
				if (state.has(action.id) && state.hasIn([action.id, action.price])) {
					let curentQty = state.getIn([action.id, action.price, 'qty']);
					state = state.setIn([action.id, action.price, 'qty'], curentQty + action.delta);
				} else {
					if (state.has(action.id) === false) {
						state = state.set(action.id, Immutable.OrderedMap({}));
					}
					let productItem = Immutable.Map({qty: action.delta, price: action.price});
					state = state.setIn([action.id, action.price], productItem);
				}
				return state;
				break;
			case CONSTANTS.DECREMENT_PRODUCT:
				//NOTE: can only decrement by ONE!
				if (state.has(action.id)) {
					let productItem = state.get(action.id).last();
					let price = productItem.get('price');
					let qty = productItem.get('qty')
					if (qty > 1) {
						state = state.setIn([action.id, price, 'qty'], --qty);
					} else {
						state = state.deleteIn([action.id, price]);
						if (state.get(action.id).size === 0) {
							state = state.delete(action.id);
						}
					}
				}
				return state;
				break;
			default:
				return state;
		}
	},
	initialUserChoices: function(state = Immutable.Map({}), action) {
		switch (action.type) {
			case CONSTANTS.LOAD_INITIAL_CHOICES:
				return action.choices;
				break;
			default:
			return state;
		}
	},

	productDetailsId: function(state = '', action) {
		switch (action.type) {
			case CONSTANTS.PRODUCT_DETAILS_SHOW:
				return action.id;
				break;
			case CONSTANTS.PRODUCT_DETAILS_HIDE:
				return '';
				break;
			default:
				return state;
		}
	}

}

module.exports = reducers;
