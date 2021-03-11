import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { NoLockIn } from 'routes/Home/NoLockIn'
import { SubscriptionTransparency } from '../../SubscriptionTransparency'
import { TermsAndConditions } from '../../TermsAndConditions'

export const PaymentFooter = ({ isNoLockInVisible }) => (
  <Fragment>
    {!isNoLockInVisible && <SubscriptionTransparency />}
    {isNoLockInVisible && <NoLockIn isCentered />}
    <TermsAndConditions isCheckoutOverhaulEnabled />
  </Fragment>
)

PaymentFooter.propTypes = {
  isNoLockInVisible: PropTypes.bool.isRequired,
}
