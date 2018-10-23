/* eslint-disable camelcase */
import PropTypes from 'prop-types';

import React from 'react';
import { isAddressConfirmed } from 'routes/Checkout/utils/delivery'
import CheckoutButton from '../../CheckoutButton'
import ErrorMessage from '../../ErrorMessage'

class SubmitButton extends React.PureComponent {
	static propTypes = {
		checkoutInvalid: PropTypes.bool,
		checkoutMobileInvalid: PropTypes.bool,
		nextStepName: PropTypes.string,
		browser: PropTypes.string,
		onStepChange: PropTypes.func,
		manualSubmit: PropTypes.func,
	}

	handleSubmit = () => {
		this.props.manualSubmit('checkout')
		if (this.props.browser === 'mobile') {
			this.props.manualSubmit('checkout-mobile')
			if (this.props.checkoutMobileInvalid) return Promise.resolve()
		}

		if (this.props.checkoutInvalid) return Promise.resolve()

		return this.props.onStepChange()
	}

	render() {
		const confirmedAddress = isAddressConfirmed(this.props.formValues)

		return (
			<div>
				<ErrorMessage />
				{confirmedAddress && <CheckoutButton
					stepName={this.props.nextStepName}
					onClick={this.handleSubmit}
				/>}
			</div>
		)
	}
}

export default SubmitButton
