/* eslint-disable camelcase */
import React from 'react'
import CheckoutButton from '../CheckoutButton'
import ErrorMessage from '../ErrorMessage'
import TermsAndConditions from '../TermsAndConditions'

class SubmitButton extends React.PureComponent {
	static propTypes = {
		onClick: React.PropTypes.func,
	}

	render() {
		return (
			<div>
				<ErrorMessage />
				<CheckoutButton
					stepName="Submit Order"
					onClick={this.props.onClick}
				/>
				<TermsAndConditions />
			</div>
		)
	}
}

export default SubmitButton
