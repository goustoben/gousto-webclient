import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { LayoutPageWrapper, Grid, Column } from 'goustouicomponents'
import { ActiveSubscription } from './ActiveSubscription'
import { PausedSubscription } from './PausedSubscription'

import css from './Subscription.css'

const propTypes = {
  subscriptionLoadData: PropTypes.func.isRequired,
  userLoadData: PropTypes.func.isRequired,
  menuLoadBoxPrices: PropTypes.func.isRequired,
  isSubscriptionActive: PropTypes.bool.isRequired
}

const Subscription = ({
  subscriptionLoadData,
  userLoadData,
  menuLoadBoxPrices,
  isSubscriptionActive
}) => {
  useEffect(() => {
    subscriptionLoadData()
    userLoadData()
    menuLoadBoxPrices()
  }, [subscriptionLoadData, userLoadData, menuLoadBoxPrices])

  return (
    <LayoutPageWrapper size="medium" padding={false} testingSelector="subscriptionSettingsPage">
      <Grid>
        <Column smallScreen={12} mediumScreen={12}>
          <h2 className={css.subscriptionPageTitle}>Subscription settings</h2>
        </Column>
      </Grid>
      {isSubscriptionActive ? <ActiveSubscription /> : <PausedSubscription />}
    </LayoutPageWrapper>
  )
}

Subscription.propTypes = propTypes

export { Subscription }
