'use strict';

const Immutable = require('immutable');

const CONFIG = require('@fe/gousto-config');
const CONSTANTS = CONFIG.PRODUCTS;

var reducers = {
	order: (state = Immutable.Map({}), action) => {
		switch (action.type) {
			case CONSTANTS.LOAD_ORDER_DATA:
				return Immutable.Map(action.data);
				break;
			default:
				return state;
		}
	}
}

module.exports = reducers;
