/* eslint-disable camelcase */
import PropTypes from 'prop-types'

import React from 'react'
import CheckoutButton from '../CheckoutButton'
import ErrorMessage from '../ErrorMessage'
import TermsAndConditions from '../TermsAndConditions'

class SubmitButton extends React.PureComponent {
	static propTypes = {
		onClick: PropTypes.func,
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
