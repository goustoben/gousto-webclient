import React, { PropTypes } from 'react'

import { Section } from 'Page/Elements'
import formContainer from '../../../Components/formContainer'
import Summary from '../../../Components/Summary'
import BoxDetails from '../../../Components/BoxDetails'
import SubmitButton from '../../../Components/SubmitButton'

import PaymentContainer, { addInitialValues, getValidationRules } from '../../../Components/SagePayCardDetails'

const sectionName = 'payment'

const PaymentSection = PaymentContainer(sectionName)

const submitPayment = (trackingOrderPlace, submit) => {
  trackingOrderPlace(true, 'sagepay')
  submit()
}

const PaymentStep = ({ submit, trackingOrderPlace, receiveRef, scrollToFirstMatchingRef }) => (
	<div>
		<PaymentSection receiveRef={receiveRef} scrollToFirstMatchingRef={scrollToFirstMatchingRef} />
		<SubmitButton onClick={() => submitPayment(trackingOrderPlace, submit)} />
		<Summary />
		<Section margin={{ top: 'LG' }}>
			<BoxDetails />
		</Section>
		<SubmitButton onClick={() => submitPayment(trackingOrderPlace, submit)} />
	</div>
)

PaymentStep.propTypes = {
  submit: PropTypes.func.isRequired,
  receiveRef: PropTypes.func,
  scrollToFirstMatchingRef: PropTypes.func,
  trackingOrderPlace: PropTypes.func,
}

const PaymentForm = formContainer(PaymentStep, getValidationRules(sectionName), 'checkout', {}) // eslint-disable-line import/no-mutable-exports

export default addInitialValues(PaymentForm, { sectionName })
