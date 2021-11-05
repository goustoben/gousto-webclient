import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'

export const newsletterReducers = {
  newsletterSignup: (state = Immutable.Map({ }), action) => {
    switch (action.type) {
    case actionTypes.NEWSLETTER_SIGNUP_PENDING:
      return Immutable.fromJS({ pending: true })
    case actionTypes.NEWSLETTER_SIGNUP_ERROR:
      return Immutable.fromJS({ error: action.message })
    case actionTypes.NEWSLETTER_SIGNUP_SUCCESS:
      return Immutable.fromJS({ success: true })
    default:
      return state
    }
  },
}
