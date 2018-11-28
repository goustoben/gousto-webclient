import { isBillingAddressDifferent } from 'routes/Checkout/utils/state'
import { sectionName as billingAddressSection, deliveryAddressSectionName as deliveryAddressSection } from './config'

export const isBillingAddressValid = (formValues) => {
  const sectionName = isBillingAddressDifferent(formValues, billingAddressSection) ? billingAddressSection : deliveryAddressSection
  const billingAddress = formValues && formValues[sectionName] ? formValues[sectionName] : {}
  const { houseNo, town, postcode } = billingAddress

  if (houseNo && town && postcode) {
    return true
  }

  return false
}
