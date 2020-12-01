import React, { useReducer, useMemo } from 'react'
import PropTypes from 'prop-types'
import { LayoutPageWrapper, Grid, Column } from 'goustouicomponents'

import {
  SubscriptionContext,
} from './context'
import { SubscriptionReducer } from './context/reducers'
import { ActiveSubscription } from './ActiveSubscription'
import { PausedSubscription } from './PausedSubscription'
import { ToastProvider } from './components/Toast'

import css from './Subscription.css'
import { useSubscriptionData } from './hooks/useSubscriptionData'

const propTypes = {
  accessToken: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  postcode: PropTypes.string.isRequired
}

const Subscription = ({
  accessToken,
  isMobile,
  postcode
}) => {
  const [state, dispatch] = useReducer(SubscriptionReducer, {})
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

  useSubscriptionData(accessToken, postcode, dispatch)

  return (
    <SubscriptionContext.Provider value={contextValue}>
      <ToastProvider>
        <LayoutPageWrapper size="medium" padding={false} testingSelector="subscriptionSettingsPage">
          <Grid>
            <Column smallScreen={12} mediumScreen={12}>
              <h2 className={css.subscriptionPageTitle}>Subscription settings</h2>
            </Column>
          </Grid>
          {/* 📝 MH TODO 📝: Validate whether this is legit or whether we need to check */}
          {/* TODO - loading state */}
          {accessToken
            ? <ActiveSubscription accessToken={accessToken} isMobile={isMobile} />
            : <PausedSubscription />}
        </LayoutPageWrapper>

      </ToastProvider>
    </SubscriptionContext.Provider>
  )
}

Subscription.propTypes = propTypes

export { Subscription }
