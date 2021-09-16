import React, { useReducer, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { LayoutPageWrapper, Grid, Column } from 'goustouicomponents'

import LoadingComponent from 'Loading'
import {
  SubscriptionContext,
} from './context'
import { SubscriptionReducer } from './context/reducers'
import { getIsSubscriptionActive, getIsSubscriptionLoaded } from './context/selectors/subscription'
import { ActiveSubscription } from './ActiveSubscription'
import { PausedSubscription } from './PausedSubscription'
import { SubscriptionTitle } from './components/SubscriptionTitle'
import { ToastProvider } from './components/Toast'

import { useSubscriptionData } from './hooks/useSubscriptionData'
import { useCurrentUserData } from './hooks/useCurrentUserData'
import { useBoxPricesData } from './hooks/useBoxPricesData'
import { useOrdersData } from './hooks/useOrdersData'
import css from './Subscription.css'

const propTypes = {
  accessToken: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  startOnScreenRecoverySubscriptionFlow: PropTypes.func.isRequired,
  isSubscriberPricingEnabled: PropTypes.bool,
}

const defaultProps = {
  isSubscriberPricingEnabled: false,
}

const Subscription = ({
  accessToken,
  isMobile,
  startOnScreenRecoverySubscriptionFlow,
  isSubscriberPricingEnabled,
}) => {
  const [shouldRequestSubscriptionsV2, setShouldRequestSubscriptionsV2] = useState(false)
  const [shouldRequestDeliveryDays, setShouldRequestDeliveryDays] = useState(false)
  const [state, dispatch] = useReducer(SubscriptionReducer, {
    isSubscriberPricingEnabled
  })
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])
  const isSubscriptionActive = getIsSubscriptionActive(state)
  const isSubscriptionLoaded = getIsSubscriptionLoaded(state)

  useCurrentUserData(accessToken, dispatch)
  useBoxPricesData(accessToken, dispatch)
  useOrdersData(accessToken, dispatch)
  useSubscriptionData(
    accessToken,
    dispatch,
    {
      shouldRequest: shouldRequestDeliveryDays,
      setShouldRequest: setShouldRequestDeliveryDays,
    },
    {
      shouldRequest: shouldRequestSubscriptionsV2,
      setShouldRequest: setShouldRequestSubscriptionsV2,
    },
    state,
  )

  if (!isSubscriptionLoaded) {
    return (
      <div className={css.loadingState}>
        <LoadingComponent />
      </div>
    )
  }

  return (
    <SubscriptionContext.Provider value={contextValue}>
      <Helmet title="Gousto Subscription | Manage Your Subscription Settings" />
      <ToastProvider>
        <LayoutPageWrapper size="medium" padding={false} testingSelector="subscriptionSettingsPage">
          <Grid>
            <Column smallScreen={12} mediumScreen={12}>
              <SubscriptionTitle />
            </Column>
          </Grid>
          {isSubscriptionActive
            ? <ActiveSubscription accessToken={accessToken} isMobile={isMobile} startOnScreenRecoverySubscriptionFlow={startOnScreenRecoverySubscriptionFlow} />
            : <PausedSubscription accessToken={accessToken} />}
        </LayoutPageWrapper>

      </ToastProvider>
    </SubscriptionContext.Provider>
  )
}

Subscription.propTypes = propTypes
Subscription.defaultProps = defaultProps

export { Subscription }
