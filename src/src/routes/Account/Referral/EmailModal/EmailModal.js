import React  from 'react'
import PropTypes from 'prop-types'
import ModalPanel from 'Modal/ModalPanel'
import css from './EmailModal.css'
import TextInput from 'Form/Input'
import { Button } from 'goustouicomponents'
import Form from 'Form'


class EmailModal extends React.Component {
	static propTypes = {
		onClose: PropTypes.func
	}

	constructor(props) {
		super(props)

		this.state = {
			email: '',
			showForm: true
		}
	}

	handleEmailChange = (value) => {
		this.setState({ email: value })
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.setState({ showForm: false })
		console.log('submitted')
	}

	showEmailReferralForm = () => {
		this.setState({
			email: '',
			showForm: true
		})
	}

	getModalBody = () => {
		if (this.state.showForm) {
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
		<Form onSubmit={props.onSubmit} method="post">
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
