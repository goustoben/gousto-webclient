import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable'
/* eslint-disable new-cap */

const request = {
	request: (state = Immutable.Map({ browser: 'desktop' }), { type, userAgent, browserType }) => {
		switch (type) {
			case actionTypes.BROWSER_SET_USER_AGENT:
				return state.set('userAgent', userAgent)
			case actionTypes.BROWSER_TYPE_CHANGE: {
				return state.set('browser', browserType)
			}
			default:
				return state
		}
	},
}

export default request
