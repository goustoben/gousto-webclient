import { isBillingAddressDifferent } from 'routes/Checkout/utils/state'
import { sectionName as billingAddressSection, deliveryAddressSectionName as deliveryAddressSection } from '../config'

export const getBillingAddress = (formValues) => {
  const sectionName = isBillingAddressDifferent(formValues, billingAddressSection) ? billingAddressSection : deliveryAddressSection

  return formValues && formValues[sectionName] ? transformBillingAddress(formValues[sectionName]) : {}
}

export const transformBillingAddress = ({ houseNo, street, postcode, town }) => ({
  addressLine1: (street) ? `${houseNo} ${street}` : houseNo,
  postcode,
  city: town
})

export const hasPropUpdated = (prop, prevProp) => (
  prop && prevProp !== prop
)
