import { connect } from 'react-redux'
import { getIsRecaptchaEnabled } from 'selectors/auth'
import actionsAuth, { changeRecaptcha } from 'actions/auth'
import { actionTypes } from 'actions/actionTypes'
import ResetPassword from './ResetPassword'

const mapStateToProps = (state) => ({
  errorResetPassword: state.error.get(actionTypes.AUTH_PASSWORD_RESET, null),
  isRecaptchaEnabled: getIsRecaptchaEnabled(state),
})

const ResetPasswordContainer = connect(mapStateToProps, {
  authResetPassword: actionsAuth.authResetPassword,
  changeRecaptcha,
})(ResetPassword)

export default ResetPasswordContainer
