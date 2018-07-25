'use strict';

const Immutable = require('immutable');

const CONFIG = require('@fe/gousto-config');
const CONSTANTS = CONFIG.PRODUCTS;

const reducers = {

	userGifts: function(state = Immutable.Map({}), action) {
		let newState = state;
		switch (action.type) {
			case CONSTANTS.LOAD_USER_GIFTS:
				action.gifts.forEach((gift) => {
					if (gift.itemable_type.toLowerCase() === 'product') {
						if (!newState.has(gift.itemable_id)) {
							newState = newState.set(gift.itemable_id, Immutable.Map({id: gift.itemable_id}));
						}
						newState = newState.setIn([gift.itemable_id, 'qty'], parseInt(gift.quantity, 10));
						newState = newState.setIn([gift.itemable_id, 'price'], gift.list_price);
						newState = newState.setIn([gift.itemable_id, 'title'], gift.title);
					}
				});
				return newState;
			case CONSTANTS.LOAD_GIFT_PRODUCT:
				action.gifts.forEach((gift) => {
					if (!newState.has(gift.id)) {
						newState = newState.set(gift.id, Immutable.Map({id: gift.id, title: gift.title}));
					}
					newState = newState.setIn([gift.id, 'images'], Immutable.fromJS(gift.images));
				});
				return newState;
			default:
				return newState;
		}
	},

}

module.exports = reducers;
