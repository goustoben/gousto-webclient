'use strict';

const Immutable = require('immutable');

const CONFIG = require('@fe/gousto-config');
const CONSTANTS = CONFIG.PRODUCTS;

var reducers = {
	user: (state = Immutable.Map({}), action) => {
		switch (action.type) {
			case CONSTANTS.LOAD_USER_DATA:
				return Immutable.Map(action.data);
				break;
			case CONSTANTS.AGE_VERIFY:
				return state.set('ageVerified', action.ageVerified);
				break;
			default:
				return state;
		}
	},

	canSave: (state = true, action) => {
		switch (action.type) {
			case CONSTANTS.SAVE_IN_PROGRESS:
				return false;
				break;
			case CONSTANTS.SAVE_FINISHED:
				return true;
				break;
			default:
				return state;
		}
	},
	saveStatus: (state = Immutable.Map({}), action) => {
		switch(action.type) {
			case CONSTANTS.INCREMENT_PRODUCT:
			case CONSTANTS.DECREMENT_PRODUCT:
				state = state.set('requiresSave', true)
				state = state.set('statusText', 'Update My Order')

				return state
			case CONSTANTS.SAVE_IN_PROGRESS:
				state = state.set('requiresSave', true)
				state = state.set('statusText', 'Saving Order...')
				return state;
				break;
			case CONSTANTS.SAVE_FINISHED:
				state = state.set('requiresSave', false)
				state = state.set('statusText', 'Order Saved!')
				return state
				break;
			default:
				return state;	
		}
	},
}

module.exports = reducers;
