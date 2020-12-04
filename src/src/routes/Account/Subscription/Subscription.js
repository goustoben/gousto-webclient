import React, { useReducer, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { LayoutPageWrapper, Grid, Column } from 'goustouicomponents'

import {
  SubscriptionContext,
} from './context'
import { SubscriptionReducer } from './context/reducers'
import { getIsSubscriptionActive } from './context/selectors/subscription'
import { ActiveSubscription } from './ActiveSubscription'
import { PausedSubscription } from './PausedSubscription'
import { SubscriptionTitle } from './components/SubscriptionTitle'
import { ToastProvider } from './components/Toast'

import { useSubscriptionData } from './hooks/useSubscriptionData'
import { useCurrentUserData } from './hooks/useCurrentUserData'

const propTypes = {
  accessToken: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
}

const Subscription = ({
  accessToken,
  isMobile,
}) => {
  const [shouldRequestDeliveryDays, setShouldRequestDeliveryDays] = useState(false)
  const [state, dispatch] = useReducer(SubscriptionReducer, {})
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])
  const isSubscriptionActive = getIsSubscriptionActive(state)

  useCurrentUserData(accessToken, dispatch)

  useSubscriptionData(
    accessToken,
    dispatch,
    {
      shouldRequest: shouldRequestDeliveryDays,
      setShouldRequest: setShouldRequestDeliveryDays,
    },
    state,
  )

  return (
    <SubscriptionContext.Provider value={contextValue}>
      <ToastProvider>
        <LayoutPageWrapper size="medium" padding={false} testingSelector="subscriptionSettingsPage">
          <Grid>
            <Column smallScreen={12} mediumScreen={12}>
              <SubscriptionTitle />
            </Column>
          </Grid>
          {/* TODO - loading state */}
          {isSubscriptionActive
            ? <ActiveSubscription accessToken={accessToken} isMobile={isMobile} />
            : <PausedSubscription />}
        </LayoutPageWrapper>

      </ToastProvider>
    </SubscriptionContext.Provider>
  )
}

Subscription.propTypes = propTypes

export { Subscription }
