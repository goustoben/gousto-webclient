import React, { useReducer, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
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
import css from './Subscription.css'

const propTypes = {
  accessToken: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  startOnScreenRecoverySubscriptionFlow: PropTypes.func.isRequired,
}

const Subscription = ({
  accessToken,
  isMobile,
  startOnScreenRecoverySubscriptionFlow,
}) => {
  const [shouldRequestDeliveryDays, setShouldRequestDeliveryDays] = useState(false)
  const [state, dispatch] = useReducer(SubscriptionReducer, {})
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])
  const isSubscriptionActive = getIsSubscriptionActive(state)
  const isSubscriptionLoaded = getIsSubscriptionLoaded(state)

  useCurrentUserData(accessToken, dispatch)
  useBoxPricesData(accessToken, dispatch)
  useSubscriptionData(
    accessToken,
    dispatch,
    {
      shouldRequest: shouldRequestDeliveryDays,
      setShouldRequest: setShouldRequestDeliveryDays,
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

export { Subscription }
