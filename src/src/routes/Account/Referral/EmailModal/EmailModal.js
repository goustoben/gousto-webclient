import React  from 'react'
import PropTypes from 'prop-types'
import ModalPanel from 'Modal/ModalPanel'
import css from '../../../Checkout/Components/AboutYou/AboutYou.css'
import TextInput from 'Form/Input'
import { Button } from 'goustouicomponents'


class EmailModal extends React.Component {
	static propTypes = {
		onClose: PropTypes.func
	}

	constructor(props) {
		super(props)

		this.state = { email: '' }
	}

	handleEmailChange = (event) => {
		this.setState({ email: event.target.value })
	}

	render() {
		return (
			<ModalPanel
				closePortal={this.props.closeEmailModal}
				className={css.modal}
				containerClassName={css.modalContainer}
			>
				<div>
					<h4>Refer a friend - Get £15</h4>
				</div>
				Enter your friend's email below:
				<TextInput
					name="email"
					color="gray"
					textAlign="left"
					type="email"
					placeholder="Your friend's email"
					onChange={this.handleEmailChange}
					value={this.state.email}
				/>
				<Button>
					Send Email
				</Button>
			</ModalPanel>
		)
	}
}

export default EmailModal
