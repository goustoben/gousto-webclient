import React, { PropTypes } from 'react'

import css from './ResetPassword.css'
import { Button } from 'goustouicomponents'
import Input from 'Form/Input'
import configAuth from 'config/auth'
import FormAlert from './FormAlert'
import Content from 'containers/Content'
import InputError from 'Form/InputError'
import { PageContent, PageHeader } from 'Page'

class ResetPassword extends React.PureComponent {

	static propTypes = {
		location: PropTypes.shape({
			query: PropTypes.shape({
				token: PropTypes.string,
			}),
		}).isRequired,
		errorResetPassword: PropTypes.string,
		authResetPassword: PropTypes.func,
	}

	static defaultProps = {
		location: { query: { token: '' } },
		isValidPassword: true,
		errorResetPassword: null,
		authResetPassword: () => {},
	}

	state = {
		passwordValue: '',
		isPasswordLengthError: false,
	}

	static isPasswordLengthValid = (passwordValue) => (
		passwordValue.length >= configAuth.PASSWORD_MIN_LENGTH
	)

	validatePasswordLength(passwordValue) {
		const isPasswordLengthError = !ResetPassword.isPasswordLengthValid(passwordValue)
		this.setState({ isPasswordLengthError })

		return isPasswordLengthError
	}

	handlePasswordChange(passwordValue) {
		this.setState({ passwordValue })
		if (this.state.isPasswordLengthError) {
			this.validatePasswordLength(passwordValue)
		}
	}

	validateAndSubmit(passwordValue) {
		const {
			location: { query: { token } },
			authResetPassword,
		} = this.props
		if (!this.validatePasswordLength(passwordValue)) {
			authResetPassword(passwordValue, token)
		}
	}

	render() {
		const { errorResetPassword } = this.props
		const { isPasswordLengthError, passwordValue } = this.state

		return (
			<div>
				<PageHeader title="Reset your Password" />
				<PageContent>
					<FormAlert errorResetPassword={errorResetPassword} />
					<Input
						type="password"
						placeholder="Please enter a new password"
						value={passwordValue}
						autoFocus
						error={isPasswordLengthError}
						onChange={(inputValue) => this.handlePasswordChange(inputValue)}
						onBlur={() => this.validatePasswordLength(passwordValue)}
						onEnter={() => this.validateAndSubmit(passwordValue)}
					/>
					{isPasswordLengthError ?
						<InputError>
							<Content contentKeys="newPasswordForm.resetPassword.resetPassword.lengthError">
								<span>Password must be at least 8 characters</span>
							</Content>
						</InputError>
					: null}
					<Button className={css.submitButton} onClick={() => this.validateAndSubmit(passwordValue)}>
						Reset password
					</Button>
				</PageContent>
			</div>
		)
	}
}

export default ResetPassword
