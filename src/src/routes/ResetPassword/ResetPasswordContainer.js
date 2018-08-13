import { connect } from 'react-redux'
import ResetPassword from './ResetPassword'
import actionsAuth from 'actions/auth'
import actionTypes from 'actions/actionTypes'

const mapStateToProps = (state) => ({
	errorResetPassword: state.error.get(actionTypes.AUTH_PASSWORD_RESET, null),
})

const ResetPasswordContainer = connect(mapStateToProps, {
	authResetPassword: actionsAuth.authResetPassword,
})(ResetPassword)

export default ResetPasswordContainer
