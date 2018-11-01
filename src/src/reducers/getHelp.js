import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable'

const getHelpInitialState = Immutable.fromJS({
	order: {
		id: '',
	},
})

const getHelp = (state, action) => {
	if (!state) {
		return getHelpInitialState
	}

	switch (action.type) {
		case actionTypes.GET_HELP_STORE_ORDER_ID: {
			return state.setIn(['order', 'id'], action.id)
		}
		default:
			return state
	}
}

export {
	getHelp,
	getHelpInitialState
}
