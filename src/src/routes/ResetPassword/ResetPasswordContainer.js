import { connect } from 'react-redux'
import { getIsRecaptchaEnabled } from 'selectors/auth'
import { actionTypes } from 'actions/actionTypes'
import ResetPassword from './ResetPassword'
import { authChangeRecaptcha } from "actions/auth/authChangeRecaptcha"
import { authResetPassword } from "actions/auth/authResetPassword"

const mapStateToProps = (state) => ({
  errorResetPassword: state.error.get(actionTypes.AUTH_PASSWORD_RESET, []),
  isRecaptchaEnabled: getIsRecaptchaEnabled(state),
})

const ResetPasswordContainer = connect(mapStateToProps, {
  authResetPassword: authResetPassword,
  changeRecaptcha: authChangeRecaptcha,
})(ResetPassword)

export default ResetPasswordContainer
