import React  from 'react'
import PropTypes from 'prop-types'

import config from 'config/home'
import css from './ReferAFriendModal.css'
import Form from 'Form'
import TextInput from 'Form/Input'
import ModalPanel from 'Modal/ModalPanel'
import { Button } from 'goustouicomponents'
import { validateEmail } from 'utils/auth'
import InputError from 'Form/InputError'


export class ReferAFriendModal extends React.PureComponent {
	static propTypes = {
		onClose: PropTypes.func.isRequired,
		userReferAFriend: PropTypes.func.isRequired,
	}

	state = {
		email: '',
		showEmailReferralForm: true,
		isEmailValid: false,
		errorMessage: ''
	}

	referAFriend = () => {
		const { email } = this.state
		const { userReferAFriend } = this.props

		userReferAFriend(email)
	}

	handleEmailChange = (value) => {
		this.setState({ email: value })
		if (value.length > 0 && validateEmail(value)) {
			return this.setState({ isEmailValid: true })
		}
		this.setState({ isEmailValid: false })
	}

	handleSubmit = (event) => {
		event.preventDefault()
		if (this.state.isEmailValid) {
			this.setState({
				showEmailReferralForm: false,
				errorMessage: ''
			})
			this.referAFriend()
		} else {
			this.setState({ errorMessage: config.emailForm.emailRequired })
		}
	}

	showEmailReferralForm = () => {
		this.setState({
			email: '',
			showEmailReferralForm: true,
			isEmailValid: false,
			errorMessage: '',
		})
	}

	render() {
		const { showEmailReferralForm, email, errorMessage } = this.state
		const { onClose } = this.props

		return (
			<ModalPanel
				closePortal={onClose}
				className={css.modal}
				containerClassName={css.modalContainer}
				disableOverlay
			>
				<div className={css.modalContent}>
					<h4 className={css.heading}>Refer a friend - Get £15</h4>
					{
						showEmailReferralForm ? (
							<div>
								<p>Enter your friend's email below:</p>
								<Form onSubmit={this.handleSubmit}>
									<div>
										<div className={css.emailInput}>
											<TextInput
												name="email"
												color="primary"
												textAlign="left"
												placeholder="Your friend's email"
												onChange={this.handleEmailChange}
												value={email}
											/>
											<InputError>{errorMessage}</InputError>
										</div>
										<div className={css.button}>
											<Button
												onClick={this.handleSubmit}
											>
												Send Email
											</Button>
										</div>
									</div>
								</Form>
							</div>
						) : (
							<div >
								<p className={css.emailSentNotification}>An invitation has been sent to your friend!</p>
								<Button
									onClick={this.showEmailReferralForm}
									className={css.button}
								>
									Invite another friend
								</Button>
							</div>)
					}
				</div>
			</ModalPanel>
		)
	}
}
