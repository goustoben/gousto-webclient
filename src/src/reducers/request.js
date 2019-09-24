import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable'
/* eslint-disable new-cap */

const initialState = () => Immutable.Map({ browser: 'desktop' })

const request = {
  request: (state = initialState(), { type, userAgent, browserType }) => {
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

export { initialState }
export default request
