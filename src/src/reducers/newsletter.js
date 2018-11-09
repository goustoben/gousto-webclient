import Immutable from 'immutable' /* eslint-disable new-cap */
import actionTypes from 'actions/actionTypes'

const newsletterSignup = {
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

export default newsletterSignup
