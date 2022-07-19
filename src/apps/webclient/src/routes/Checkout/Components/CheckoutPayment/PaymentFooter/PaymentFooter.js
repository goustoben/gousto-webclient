import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import { SubscriptionTransparency } from '../../SubscriptionTransparency'
import { TermsAndConditions } from '../../TermsAndConditions'

export const PaymentFooter = ({ isGoustoOnDemandEnabled, isDeliveryFree }) => (
  <Fragment>
    {isGoustoOnDemandEnabled ? null : <SubscriptionTransparency isDeliveryFree={isDeliveryFree} />}
    <TermsAndConditions />
  </Fragment>
)

PaymentFooter.propTypes = {
  isGoustoOnDemandEnabled: PropTypes.bool,
  isDeliveryFree: PropTypes.bool,
}

PaymentFooter.defaultProps = {
  isGoustoOnDemandEnabled: false,
  isDeliveryFree: null,
}
