import { actionTypes } from 'actions/actionTypes'

export function loginFailed(action, state) {
  return {
    type: action.type,
    data: {
      reason: state.error.get(actionTypes.USER_LOGIN),
    },
  }
}
