import React from 'react'
import { Route } from 'react-router'
import config from 'config/routes'
import SubscriptionContainer from './SubscriptionContainer'

export default (
  <Route path={config.client.mySubscription2} component={SubscriptionContainer} />
)
