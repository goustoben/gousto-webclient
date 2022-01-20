import { connect } from 'react-redux'
import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { getIsRecaptchaEnabled } from 'selectors/auth'
import { getIsAppAwarenessLoginEnabled } from 'selectors/appLoginModal'
import { changeRecaptcha } from 'actions/auth'
import { LoginForm } from './LoginForm'

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
    isRecaptchaEnabled: getIsRecaptchaEnabled(state),
    showAppAwareness: getIsAppAwarenessLoginEnabled(state),
  }
}

const LoginFormContainer = connect(mapStateToProps, {
  onSubmit: actions.loginUser,
  onInvalid: actions.cannotLogin,
  changeRecaptcha
})(LoginForm)

export {
  LoginFormContainer
}

