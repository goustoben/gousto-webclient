import { connect } from 'react-redux'
import actions from 'actions'
import { trackUserAttributes } from 'actions/tracking'
import { actionTypes } from 'actions/actionTypes'
import { getIsSignupReductionEnabled } from 'selectors/features'
import routes from 'config/routes'
import { getUserId } from 'selectors/user'
import { trackUserLogin } from 'actions/loggingmanager'
import { Page } from './Page'

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

export const PageContainer = connect((state) => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
  disabled: state.auth.get('isAdmin'),
  email: state.user.get('email'),
  userId: getUserId(state),
  goustoReference: state.user.get('goustoReference'),
  contentFetchPending: state.pending.get(actionTypes.CONTENT_RECEIVE, false),
  isSignupReductionEnabled: isRedirectEnabled(state)
}), {
  loginVisibilityChange: actions.loginVisibilityChange,
  trackUserAttributes,
  trackUserLogin,
  userLoadData: actions.userLoadData,
})(Page)
