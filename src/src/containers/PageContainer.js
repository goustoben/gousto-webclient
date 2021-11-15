import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { getIsSignupReductionEnabled } from 'selectors/features'
import routes from 'config/routes'
import Page from './Page'
import { trackUserAttributes } from "actions/tracking/trackUserAttributes"
import { loginVisibilityChange } from "actions/login/loginVisibilityChange"
import { userLoadData } from "actions/user/userLoadData"

export function isRedirectEnabled(state) {
  const { locationBeforeTransitions } = state.routing || {}
  if (getIsSignupReductionEnabled(state) && locationBeforeTransitions && locationBeforeTransitions.pathname) {
    const { pathname } = locationBeforeTransitions
    const { signup, 'check-out': checkout } = routes.client
    if (pathname.includes(signup) || pathname.includes(checkout)) {
      return true
    }
  }

  return false
}

export default connect((state) => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
  disabled: state.auth.get('isAdmin'),
  email: state.user.get('email'),
  goustoReference: state.user.get('goustoReference'),
  contentFetchPending: state.pending.get(actionTypes.CONTENT_RECEIVE, false),
  isSignupReductionEnabled: isRedirectEnabled(state)
}), {
  loginVisibilityChange,
  trackUserAttributes,
  userLoadData,
})(Page)
