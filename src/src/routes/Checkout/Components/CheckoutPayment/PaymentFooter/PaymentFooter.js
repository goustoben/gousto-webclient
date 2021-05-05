import React, { Fragment } from 'react'
import { SubscriptionTransparency } from '../../SubscriptionTransparency'
import { TermsAndConditions } from '../../TermsAndConditions'

export const PaymentFooter = () => (
  <Fragment>
    <SubscriptionTransparency />
    <TermsAndConditions />
  </Fragment>
)
