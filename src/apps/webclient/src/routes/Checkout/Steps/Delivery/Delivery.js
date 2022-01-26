import PropTypes from 'prop-types'
import React from 'react'
import { deliveryValidations } from 'validations/delivery'
import { formContainer } from '../../Components/formContainer'
import { DeliveryContainer, addInitialValues, validationMessages } from '../../Components/Delivery'

const sectionName = 'delivery'

const DeliverySection = DeliveryContainer(sectionName)

export const DeliveryStep = ({ submit, receiveRef, scrollToFirstMatchingRef }) => (
  <DeliverySection
    receiveRef={receiveRef}
    scrollToFirstMatchingRef={scrollToFirstMatchingRef}
    submit={submit}
  />
)

DeliveryStep.propTypes = {
  submit: PropTypes.func.isRequired,
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
  validationMessages(sectionName)
) // eslint-disable-line import/no-mutable-exports

const Delivery = addInitialValues(DeliveryYouForm, { sectionName })

export { Delivery }
