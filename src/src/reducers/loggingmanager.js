import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'

export const initialState = Immutable.fromJS({
  eventSent: {
    goustoAppLinkSMS: false,
  },
})

export const loggingManager = (state = initialState, action) => {
  const { response } = action

  switch (action.type) {
  case actionTypes.LOGGING_MANAGER_EVENT_SENT:
    return state.setIn(['eventSent', response.key], response.value)
  default:
    return state
  }
}
