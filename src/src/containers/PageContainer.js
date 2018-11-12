import { connect } from 'react-redux'
import Page from './Page'
import actions from 'actions'
import actionTypes from 'actions/actionTypes'

export default connect((state) => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
  disabled: state.auth.get('isAdmin'),
  email: state.user.get('email'),
  goustoReference: state.user.get('goustoReference'),
  contentFetchPending: state.pending.get(actionTypes.CONTENT_RECEIVE, false),
}), {
  loginVisibilityChange: actions.loginVisibilityChange,
})(Page)
