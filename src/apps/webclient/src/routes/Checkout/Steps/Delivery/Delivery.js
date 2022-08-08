import React from 'react'

import PropTypes from 'prop-types'

import { RibbonTriggerContainer } from 'components/RibbonTrigger'
import { deliveryValidations } from 'routes/Checkout/checkoutValidations'

import { DeliveryContainer, addInitialValues, validationMessages } from '../../Components/Delivery'
import { formContainer } from '../../Components/formContainer'

const sectionName = 'delivery'

const DeliverySection = DeliveryContainer(sectionName)

export const DeliveryStep = ({ submit, receiveRef, scrollToFirstMatchingRef, change }) => (
  <>
    <DeliverySection
      receiveRef={receiveRef}
      scrollToFirstMatchingRef={scrollToFirstMatchingRef}
      submit={submit}
      change={change}
    />
    <RibbonTriggerContainer name="checkout-delivery" />
  </>
)

DeliveryStep.propTypes = {
  submit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  receiveRef: PropTypes.func,
  scrollToFirstMatchingRef: PropTypes.func,
}

DeliveryStep.defaultProps = {
  receiveRef: () => {},
  scrollToFirstMatchingRef: () => {},
}

const DeliveryYouForm = formContainer(
  DeliveryStep,
  deliveryValidations(sectionName),
  sectionName,
  validationMessages(sectionName),
) // eslint-disable-line import/no-mutable-exports

const Delivery = addInitialValues(DeliveryYouForm, { sectionName })

export { Delivery }
