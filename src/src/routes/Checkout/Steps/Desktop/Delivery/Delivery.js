import PropTypes from 'prop-types'
import React from 'react'

import delivery from 'validations/delivery'
import formContainer from '../../../Components/formContainer'

import CheckoutButton from '../../../Components/CheckoutButton'

import DeliveryContainer, { addInitialValues, validationMessages } from '../../../Components/Delivery'

const sectionName = 'delivery'

const DeliverySection = DeliveryContainer(sectionName)

export const DeliveryStep = ({ submit, nextStepName, formValues, receiveRef, scrollToFirstMatchingRef, trackUTMAndPromoCode }) => {
  const isAddressConfirmed = formValues && formValues[sectionName] && formValues[sectionName].confirmed

  const handleClick = () => {
    trackUTMAndPromoCode('clickNextPayment')
    submit()
  }

  return (
    <div>
      <DeliverySection
        receiveRef={receiveRef}
        scrollToFirstMatchingRef={scrollToFirstMatchingRef}
      />
      {isAddressConfirmed && (
        <CheckoutButton
          onClick={handleClick}
          stepName={`Next: ${nextStepName}`}
        />
      )}
    </div>
  )
}

DeliveryStep.propTypes = {
  submit: PropTypes.func.isRequired,
  nextStepName: PropTypes.string,
  formValues: PropTypes.objectOf(PropTypes.object),
  receiveRef: PropTypes.func,
  scrollToFirstMatchingRef: PropTypes.func,
  trackUTMAndPromoCode: PropTypes.func,
}

DeliveryStep.defaultProps = {
  trackUTMAndPromoCode: () => {},
  nextStepName: '',
  formValues: {},
  receiveRef: () => { },
  scrollToFirstMatchingRef: () => { },
}

const DeliveryYouForm = formContainer(DeliveryStep, delivery(sectionName), sectionName, validationMessages(sectionName)) // eslint-disable-line import/no-mutable-exports

export default addInitialValues(DeliveryYouForm, { sectionName })
