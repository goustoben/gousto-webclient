import React from 'react'
import PropTypes from 'prop-types'
import { FormSection } from 'redux-form'

import { BillingAddress } from 'routes/Checkout/Components/BillingAddress'

export const CheckoutAddress = ({
  sectionName,
  asyncValidate,
  receiveRef,
  scrollToFirstMatchingRef,
  isCheckoutOverhaulEnabled,
}) => (
  <FormSection name={sectionName}>
    <BillingAddress
      asyncValidate={asyncValidate}
      receiveRef={receiveRef}
      scrollToFirstMatchingRef={scrollToFirstMatchingRef}
      isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}
    />
  </FormSection>
)

CheckoutAddress.propTypes = {
  receiveRef: PropTypes.func,
  asyncValidate: PropTypes.func,
  sectionName: PropTypes.string,
  scrollToFirstMatchingRef: PropTypes.func,
  isCheckoutOverhaulEnabled: PropTypes.bool,
}

CheckoutAddress.defaultProps = {
  isCheckoutOverhaulEnabled: false,
}
