import PropTypes from 'prop-types'
import React from 'react'
import delivery from 'validations/delivery'
import { checkoutClickContinueToPayment } from 'actions/trackingKeys'
import { formContainer } from '../../../Components/formContainer'
import { CheckoutButton } from '../../../Components/CheckoutButton'
import DeliveryContainer, { addInitialValues, validationMessages } from '../../../Components/Delivery'

const sectionName = 'delivery'

const DeliverySection = DeliveryContainer(sectionName)

export const DeliveryStep = ({ submit, nextStepName, formValues, receiveRef, scrollToFirstMatchingRef, trackUTMAndPromoCode, isCheckoutOverhaulEnabled }) => {
  const isAddressConfirmed = formValues && formValues[sectionName] && formValues[sectionName].confirmed

  const handleClick = () => {
    trackUTMAndPromoCode(checkoutClickContinueToPayment, 'desktop')
    submit()
  }

  return (
    <div>
      <DeliverySection
        receiveRef={receiveRef}
        scrollToFirstMatchingRef={scrollToFirstMatchingRef}
        submit={submit}
      />
      {isAddressConfirmed && !isCheckoutOverhaulEnabled && (
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
  isCheckoutOverhaulEnabled: PropTypes.bool,
}

DeliveryStep.defaultProps = {
  trackUTMAndPromoCode: () => {},
  nextStepName: '',
  formValues: {},
  receiveRef: () => { },
  scrollToFirstMatchingRef: () => { },
  isCheckoutOverhaulEnabled: false,
}

const DeliveryYouForm = formContainer(DeliveryStep, delivery(sectionName), sectionName, validationMessages(sectionName)) // eslint-disable-line import/no-mutable-exports

const Delivery = addInitialValues(DeliveryYouForm, { sectionName })

export {
  Delivery
}
