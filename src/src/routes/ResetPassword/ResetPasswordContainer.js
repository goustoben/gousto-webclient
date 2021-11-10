import { connect } from 'react-redux'
import { getIsRecaptchaEnabled } from 'selectors/auth'
import { changeRecaptcha, authResetPassword } from 'actions/auth'
import { actionTypes } from 'actions/actionTypes'
import { ResetPassword } from './ResetPassword'

const mapStateToProps = (state) => ({
  errorResetPassword: state.error.get(actionTypes.AUTH_PASSWORD_RESET, []),
  isRecaptchaEnabled: getIsRecaptchaEnabled(state),
})

export const ResetPasswordContainer = connect(mapStateToProps, {
  authResetPassword,
  changeRecaptcha,
})(ResetPassword)
