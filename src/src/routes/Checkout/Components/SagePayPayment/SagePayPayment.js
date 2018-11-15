import React from 'react'
import { Field, FormSection } from 'redux-form'

import Svg from 'Svg'
import config from 'config/checkout'
import { inferCardType } from 'utils/checkout'
import ReduxFormInput from 'Form/ReduxFormInput'
import { showAddress } from 'routes/Checkout/utils/delivery'
import PaymentSecurityCode from './PaymentSecurityCode'
import PaymentExpiryDate from './PaymentExpiryDate'
import { PaymentHeader } from '../PaymentHeader'
import BillingAddress from './BillingAddress'
import css from './SagePayPayment.css'

class SagePayPayment extends React.PureComponent {

	static propTypes = {
	  handleSubmit: React.PropTypes.func,
	  asyncValidate: React.PropTypes.func,
	  change: React.PropTypes.func,
	  untouch: React.PropTypes.func,
	  deliveryAddress: React.PropTypes.object,
	  form: React.PropTypes.string,
	  formValues: React.PropTypes.object,
	  nextStepName: React.PropTypes.string,
	  formSectionName: React.PropTypes.string,
	  clearErrors: React.PropTypes.func,
	  receiveRef: React.PropTypes.func,
	}

	static defaultProps = {
	  deliveryAddress: {},
	  formSectionName: 'payment',
	  clearErrors: () => {},
	  receiveRef: () => {},
	}

	constructor(props) {
	  super(props)

	  this.state = {
	    useDeliveryAddress: true,
	  }
	}

	componentDidMount() {
	  const { formSectionName, form, change, untouch, clearErrors } = this.props

	  const clearFields = ['cardName', 'cardType', 'cardNumber', 'cv2', 'cardExpiryMonth', 'cardExpiryYear']
	  clearFields.forEach((field) => {
	    const fieldName = `${formSectionName}.${field}`
	    change(form, fieldName, '')
	    untouch(form, fieldName)
	  })

	  // redux-form removed values from delivery if this was set through initialValues
	  change(form, `${formSectionName}.isBillingAddressDifferent`, false)

	  // reset error msg
	  clearErrors()
	}

	toggleDeliveryAddress = () => {
	  const { formValues, formSectionName, form } = this.props

	  const isBillingAddressDifferent = formValues && formValues[formSectionName] && formValues[formSectionName].isBillingAddressDifferent
	  this.props.change(form, `${formSectionName}.isBillingAddressDifferent`, !isBillingAddressDifferent)
	}

	normalizeCardNumber = (value) => {
	  if (!value) {
	    return value
	  }

	  /**
		 * return onlyNums
		 */
	  return value.replace(/[^\d]/g, '')
	}

	paymentOptions() {
	  return config.cardTypeOptions.map((option) => {
	    const newOption = option
	    newOption.subLabel = (<span className={css[option.icon]} aria-hidden="true" />)

	    return newOption
	  })
	}

	cardNumberUpdated = (value) => {
	  if (!value) {
	    return null
	  }
	  const { formValues, form } = this.props
	  value = Object.values(value).join('') // eslint-disable-line no-param-reassign

	  if (!formValues.cardType) {
	    const cardType = inferCardType(value)
	    if (config.supportedCardTypes.indexOf(cardType) !== -1 || cardType === '') {
	      const fieldName = `${this.props.formSectionName}.cardType`
	      this.props.change(form, fieldName, cardType)
	    }
	  }

	  return null
	}

	renderBillingAddress = () => {
	  const isBillingAddressDifferent = this.props.formValues && this.props.formValues[this.props.formSectionName] && this.props.formValues[this.props.formSectionName].isBillingAddressDifferent

	  return (
			<div>
				<p>Billing Address</p>
				{!isBillingAddressDifferent && <p className={css.textSMWithBottomMargin}>{showAddress(!isBillingAddressDifferent ? this.props.deliveryAddress : this.props.billingAddress)}</p>}
				<p>
					<span
					  data-testing="checkout_payment_toggle"
					  className={css.link}
					  onClick={this.toggleDeliveryAddress}
					>
						{!isBillingAddressDifferent ? 'Enter new billing address' : 'Use Delivery address'}&nbsp;
						<span className={css.linkRight} />
					</span>
				</p>
				{isBillingAddressDifferent && <BillingAddress
				  isDelivery={false}
				  asyncValidate={this.props.asyncValidate}
				  formName={this.props.form}
				  sectionName={this.props.formSectionName}
				  formValues={this.props.formValues || {}}
				  onSaveAction={this.toggleDeliveryAddress}
				  receiveRef={this.props.receiveRef}
				  scrollToFirstMatchingRef={this.props.scrollToFirstMatchingRef}
				/>}
			</div>
	  )
	}

	render() {
	  const { formSectionName: sectionName } = this.props

	  return (
			<div>
				<FormSection name={this.props.formSectionName}>
					<div className={css.paymentContainer} data-testing="checkoutPaymentSection">
						<PaymentHeader />
						<div className={css.wrapper}>
							<div className={css.icons}>
								<Svg fileName="icon-Maestro-dark" className={css.iconCardObverse} />
								<Svg fileName="icon-MasterCard-dark" className={css.iconCardObverse} />
								<Svg fileName="icon-Visa-dark" className={css.iconCardObverse} />
							</div>
							<div className={css.main}>
								<Field
								  name="cardName"
								  component={ReduxFormInput}
								  inputType="Input"
								  color="gray"
								  label="Name"
								  mask
								  withRef
								  ref={this.props.receiveRef}
								  refId={`${sectionName}.cardName`}
								  data-testing="checkoutCardNameInput"
								/>
								<div className={css.cardDetails}>
									<div className={css.cardNumberWrapper}>
										<Field
										  name="cardNumber"
										  component={ReduxFormInput}
										  inputType="Input"
										  pattern="[0-9]*"
										  color="gray"
										  label="Card Number"
										  onChange={this.cardNumberUpdated}
										  normalize={this.normalizeCardNumber}
										  mask
										  withRef
										  ref={this.props.receiveRef}
										  refId={`${sectionName}.cardNumber`}
										  data-testing="checkoutCardNumberInput"
										/>
									</div>
									<div className={css.cardTypeWrapper}>
										<Field
										  name="cardType"
										  component={ReduxFormInput}
										  inputType="DropDown"
										  options={this.paymentOptions()}
										  label="Card Type"
										  mask
										  withRef
										  ref={this.props.receiveRef}
										  refId={`${sectionName}.cardType`}
										/>
									</div>
								</div>

								<PaymentSecurityCode receiveRef={this.props.receiveRef} sectionName={sectionName} />
								<PaymentExpiryDate receiveRef={this.props.receiveRef} sectionName={sectionName} />
							</div>
						</div>
						{this.renderBillingAddress()}
					</div>
				</FormSection>
			</div>
	  )
	}
}

export { SagePayPayment }
