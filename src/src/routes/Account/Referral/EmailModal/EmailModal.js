import React  from 'react'
import PropTypes from 'prop-types'
import ModalPanel from 'Modal/ModalPanel'
import css from './EmailModal.css'
import TextInput from 'Form/Input'
import { Button } from 'goustouicomponents'
import Form from 'Form'
import { referAFriend } from 'apis/user'
import { validateEmail } from 'utils/auth'

class EmailModal extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			showEmailReferralForm: true,
			isEmailValid: false
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
			this.setState({ showEmailReferralForm: false })
			this.referAFriend()
		} else {
			console.log('invalid')
		}
	}

	showEmailReferralForm = () => {
		this.setState({
			email: '',
			showEmailReferralForm: true,
			emailValid: false
		})
	}

	getModalBody = () => {
		if (this.state.showEmailReferralForm) {
			return <EmailReferralForm
				onSubmit={this.handleSubmit}
				onEmailChange={this.handleEmailChange}
				email={this.state.email}
			/>
		} else {
			return <EmailSentConfirmation onButtonClick={this.showEmailReferralForm}/>
		}
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
					{this.getModalBody()}
				</div>
			</ModalPanel>
		)
	}
}

const EmailReferralForm = (props) => (
	<div>
		Enter your friend's email below:
		<Form onSubmit={props.onSubmit}>
			<div>
				<div>
					<TextInput
						name="email"
						color="primary"
						textAlign="left"
						placeholder="Your friend's email"
						onChange={props.onEmailChange}
						value={props.email}
					/>
				</div>
				<br />
				<div className={css.flex}>
					<Button
						onClick={props.onSubmit}
					>
						Send Email
					</Button>
				</div>
			</div>
		</Form>
	</div>
)

EmailReferralForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onEmailChange: PropTypes.func.isRequired,
	email: PropTypes.string.isRequired
}

const EmailSentConfirmation = (props) => (
	<div>
		Email sent!
		<br />
		<br />
		<Button
			onClick={props.onButtonClick}
		>
			Invite more friends
		</Button>
	</div>
)

EmailSentConfirmation.propTypes = {
	onButtonClick: PropTypes.func.isRequired
}


export default EmailModal
