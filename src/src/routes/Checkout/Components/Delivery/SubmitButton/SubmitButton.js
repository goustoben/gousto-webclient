/* eslint-disable camelcase */
import React from 'react'
import { isAddressConfirmed } from 'routes/Checkout/utils/delivery'
import CheckoutButton from '../../CheckoutButton'
import ErrorMessage from '../../ErrorMessage'

class SubmitButton extends React.PureComponent {
	static propTypes = {
	  checkoutInvalid: React.PropTypes.bool,
	  checkoutMobileInvalid: React.PropTypes.bool,
	  nextStepName: React.PropTypes.string,
	  browser: React.PropTypes.string,
	  onStepChange: React.PropTypes.func,
	  manualSubmit: React.PropTypes.func,
	}

	handleSubmit = () => {

	  this.props.manualSubmit('delivery')
	  if (this.props.browser === 'mobile') {
	    this.props.manualSubmit('yourdetails')
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
