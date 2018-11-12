import Login from './Login'
import { connect } from 'react-redux'
import actions from 'actions'
import actionTypes from 'actions/actionTypes'

const mapStateToProps = (state) => {
  let err = state.error.get(actionTypes.USER_LOGIN)
  if (typeof err === 'object' && err.message) {
    err = err.message
  }

  return {
    statusText: err,
    isAuthenticated: state.auth.get('isAuthenticated'),
    isAuthenticating: state.pending.get(actionTypes.USER_LOGIN),
    rememberMeDefault: state.features.getIn(['rememberMeDefault', 'value'], true),
  }
}

export default connect(mapStateToProps, {
  onSubmit: actions.loginUser,
  onInvalid: actions.cannotLogin,
})(Login)
