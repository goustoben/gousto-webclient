import Immutable from 'immutable' /* eslint-disable new-cap */
import actionTypes from 'actions/actionTypes'

const initialState = Immutable.fromJS({
	asource: undefined,
})

const tracking = {
	tracking: (state = initialState, action) => {
		switch (action.type) {
			case actionTypes.AFFILIATE_SOURCE_SET: {
				return state.set('asource', action.asource)
			}

			default: {
				return state
			}
		}
	},
}

export default tracking
