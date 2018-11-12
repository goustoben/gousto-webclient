/* eslint-disable camelcase */
import React from 'react'
import classnames from 'classnames'
import { Field } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'
import configCheckout from 'config/checkout'
import css from '../Delivery.css'
import CheckoutTooltip from '../../CheckoutTooltip/CheckoutTooltip'

const DELIVER_TO_OPTIONS = configCheckout.deliverToOptions

class DeliveryAddressType extends React.PureComponent {
	static propTypes = {
	  value: React.PropTypes.any,
	  reset: React.PropTypes.func.isRequired,
	  receiveRef: React.PropTypes.func,
	}

	static defaultProps = {
	  value: '',
	  receiveRef: () => {},
	}

	componentWillReceiveProps(nextProps) {
	  if (this.shouldShowOtherInput(this.props.value) && !this.shouldShowOtherInput(nextProps.value)) {
	    this.props.reset('customAddressType')
	  }
	}

	shouldShowOtherInput = chosenValue =>
	  chosenValue.toLowerCase() === 'other'

	render() {
	  const inputSuffix = (<div className={css.checkoutTooltip}>
			<CheckoutTooltip version="Desktop">
				{configCheckout.tooltip.addressType}
			</CheckoutTooltip>
			<CheckoutTooltip version="Mobile" placement="top">
				{configCheckout.tooltip.addressType}
			</CheckoutTooltip>
		</div>)

	  const showOtherInput = this.shouldShowOtherInput(this.props.value)

	  return (
			<div className={css.deliveryFieldWrapper}>
				<div className={css.row}>
					<div className={css.colOneThrice}>
						<div className="deliveryDropdown">
							<Field
							  name="addressType"
							  component={ReduxFormInput}
							  inputSuffix={inputSuffix}
							  options={DELIVER_TO_OPTIONS}
							  inputType="DropDown"
							  label="Address type"
							  withRef
							  ref={this.props.receiveRef}
							  refId={`${this.props.sectionName}.addressType`}
							/>
						</div>
					</div>
				</div>
				{showOtherInput &&
					<div className={classnames(css.row, css.deliveryField)}>
						<div className={css.colMD}>
							<Field
							  name="customAddressType"
							  component={ReduxFormInput}
							  inputType="Input"
							  placeholder="Other type of address"
							  required
							  color="gray"
							  mask
							  withRef
							  ref={this.props.receiveRef}
							  refId={`${this.props.sectionName}.customAddressType`}
							/>
						</div>
					</div>
				}
			</div>
	  )
	}
}

export default DeliveryAddressType
