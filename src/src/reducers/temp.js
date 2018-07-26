import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */

const temp = {
	temp: (state = Immutable.Map({}), action) => {
		switch (action.type) {
			case actionTypes.TEMP:
				if (action.hasOwnProperty('key') && action.hasOwnProperty('value')) {
					return state.set(action.key, action.value)
				}

				return state
			default:
				return state
		}
	},
}

export default temp
