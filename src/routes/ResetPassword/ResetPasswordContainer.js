import { connect } from 'react-redux'
import actionsAuth from 'actions/auth'
import actionTypes from 'actions/actionTypes'
import ResetPassword from './ResetPassword'

const mapStateToProps = (state) => ({
  errorResetPassword: state.error.get(actionTypes.AUTH_PASSWORD_RESET, null),
})

const ResetPasswordContainer = connect(mapStateToProps, {
  authResetPassword: actionsAuth.authResetPassword,
})(ResetPassword)

export default ResetPasswordContainer
