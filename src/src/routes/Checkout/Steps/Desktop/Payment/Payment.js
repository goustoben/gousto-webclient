import PropTypes from 'prop-types'
import React from 'react'

import formContainer from '../../../Components/formContainer'
import SubmitButton from '../../../Components/SubmitButton'

import PaymentContainer, { addInitialValues, getValidationRules } from '../../../Components/Payment'

const sectionName = 'payment'

const PaymentSection = PaymentContainer(sectionName)

const PaymentStep = ({ submit, receiveRef, scrollToFirstMatchingRef }) => (
	<div>
		<PaymentSection receiveRef={receiveRef} scrollToFirstMatchingRef={scrollToFirstMatchingRef} />
		<SubmitButton onClick={submit} />
	</div>
)

PaymentStep.propTypes = {
	submit: PropTypes.func.isRequired,
	receiveRef: PropTypes.func,
	scrollToFirstMatchingRef: PropTypes.func,
}

const PaymentForm = formContainer(PaymentStep, getValidationRules(sectionName), {}) // eslint-disable-line import/no-mutable-exports

export default addInitialValues(PaymentForm, { sectionName })
