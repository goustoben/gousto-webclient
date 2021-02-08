import React, { Fragment } from 'react'
import { NoLockIn } from 'routes/Home/NoLockIn'
import { TermsAndConditions } from '../../TermsAndConditions'

export const PaymentFooter = () => (
  <Fragment>
    <NoLockIn isCentered />
    <TermsAndConditions isCheckoutOverhaulEnabled />
  </Fragment>
)
