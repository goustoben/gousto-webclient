import React  from 'react'
import PropTypes from 'prop-types'
import ModalPanel from 'Modal/ModalPanel'
import css from './EmailModal.css'
import TextInput from 'Form/Input'
import { Button } from 'goustouicomponents'
import Form from 'Form'
import { referAFriend } from 'apis/user'
import { validateEmail } from 'utils/auth'
import config from 'config/home'

class EmailModal extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			showEmailReferralForm: true,
			isEmailValid: false,
			errorMessage: ''
		}
	}

	static propTypes = {
		onClose: PropTypes.func
	}

	static contextTypes = {
		store: PropTypes.object.isRequired,
	}

	static postReferral = (accessToken, email) => {
		referAFriend(accessToken, { emails: [email] })
	}

	referAFriend = () => {
		const email = this.state.email
		const accessToken = this.context.store.getState().auth.get('accessToken')

		EmailModal.postReferral(accessToken, email)
	}

	handleEmailChange = (value) => {
		this.setState({ email: value })

		if (value.length > 0 && validateEmail(value)) {
			this.setState({ isEmailValid: true })
		} else {
			this.setState({ isEmailValid: false })
		}
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
			errorMessage: ''
		})
	}

	render() {
		return (
			<ModalPanel
				closePortal={this.props.onClose}
				className={css.modal}
				containerClassName={css.modalContainer}
			>
				<div className={css.modalContent}>
					<h4 className={css.heading}>Refer a friend - Get £15</h4>
					<span className={css.errorMsg}>{this.state.errorMessage}</span>
					{
						this.state.showEmailReferralForm ? (
							<div>
								Enter your friend's email below:
								<Form onSubmit={this.handleSubmit}>
									<div>
										<div>
											<TextInput
												name="email"
												color="primary"
												textAlign="left"
												placeholder="Your friend's email"
												onChange={this.handleEmailChange}
												value={this.state.email}
											/>
										</div>
										<br />
										<div className={css.flex}>
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
							<div>
								Email sent!
								<br />
								<Button
									onClick={this.showEmailReferralForm}
								>
									Invite more friends
								</Button>
							</div>)
					}
				</div>
			</ModalPanel>
		)
	}
}

export default EmailModal
