import { isBillingAddressDifferent } from 'routes/Checkout/utils/state'
import { sectionName as billingAddressSection, deliveryAddressSectionName as deliveryAddressSection } from '../config'
import actionTypes from 'actions/actionTypes'

export const getBillingAddress = (formValues) => {
  const sectionName = isBillingAddressDifferent(formValues, billingAddressSection) ? billingAddressSection : deliveryAddressSection

  return formValues && formValues[sectionName] ? transformBillingAddress(formValues[sectionName]) : {}
}

export const transformBillingAddress = ({ houseNo, street, postcode, town }) => ({
  addressLine1: houseNo,
  addressLine2: street,
  postcode,
  city: town
})

export const getErrorType = (errorCode) => {
  if (errorCode === '82031') {
    return actionTypes.CARD_TOKENISATION_FAILED
  }

  return actionTypes.NETWORK_FAILURE
}
