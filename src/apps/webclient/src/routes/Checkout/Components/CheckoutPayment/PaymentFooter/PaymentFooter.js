import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import { SubscriptionTransparency } from '../../SubscriptionTransparency'
import { TermsAndConditions } from '../../TermsAndConditions'

export const PaymentFooter = ({ isGoustoOnDemandEnabled }) => (
  <Fragment>
    {isGoustoOnDemandEnabled ? null : <SubscriptionTransparency />}
    <TermsAndConditions />
  </Fragment>
)

PaymentFooter.propTypes = {
  isGoustoOnDemandEnabled: PropTypes.bool,
}

PaymentFooter.defaultProps = {
  isGoustoOnDemandEnabled: false,
}
