import React, { PropTypes } from 'react'

import formContainer from '../../../Components/formContainer'
import SubmitButton from '../../../Components/SubmitButton'

import PaymentContainer, { addInitialValues, getValidationRules } from '../../../Components/SagePayCardDetails'

const sectionName = 'payment'

const PaymentSection = PaymentContainer(sectionName)

const submitPayment = (submit) => {
  submit()
}

const PaymentStep = ({ submit, receiveRef, scrollToFirstMatchingRef }) => (
	<div>
		<PaymentSection receiveRef={receiveRef} scrollToFirstMatchingRef={scrollToFirstMatchingRef} />
		<SubmitButton onClick={() => submitPayment(submit)} />
	</div>
)

PaymentStep.propTypes = {
  submit: PropTypes.func.isRequired,
  receiveRef: PropTypes.func,
  scrollToFirstMatchingRef: PropTypes.func,
  trackingOrderPlace: PropTypes.func,
}

const PaymentForm = formContainer(PaymentStep, getValidationRules(sectionName), sectionName) // eslint-disable-line import/no-mutable-exports

export default addInitialValues(PaymentForm, { sectionName })
