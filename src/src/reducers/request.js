import { actionTypes } from 'actions/actionTypes'
import Immutable from 'immutable'

export const initialState = () => Immutable.Map({ browser: 'desktop' })

export const requestReducers = {
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
