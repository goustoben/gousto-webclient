import PropTypes from 'prop-types'
import React from 'react'

import delivery from 'validations/delivery'
import formContainer from '../../../Components/formContainer'

import CheckoutButton from '../../../Components/CheckoutButton'

import DeliveryContainer, { addInitialValues, validationMessages } from '../../../Components/Delivery'

const sectionName = 'delivery'

const DeliverySection = DeliveryContainer(sectionName)

const DeliveryStep = ({ submit, nextStepName, formValues, receiveRef, scrollToFirstMatchingRef }) => {
	const isAddressConfirmed = formValues && formValues[sectionName] && formValues[sectionName].confirmed

	return (
		<div>
			<DeliverySection receiveRef={receiveRef} scrollToFirstMatchingRef={scrollToFirstMatchingRef} />
			{isAddressConfirmed && <CheckoutButton
				onClick={submit}
				stepName={`next: ${nextStepName}`}
			/>}
		</div>
	)
}

DeliveryStep.propTypes = {
	submit: PropTypes.func.isRequired,
	nextStepName: PropTypes.string,
	formValues: PropTypes.object,
	receiveRef: PropTypes.func,
	scrollToFirstMatchingRef: PropTypes.func,
}

const DeliveryYouForm = formContainer(DeliveryStep, delivery(sectionName), validationMessages(sectionName)) // eslint-disable-line import/no-mutable-exports

export default addInitialValues(DeliveryYouForm, { sectionName })
