import React from 'react'
import { Route, Redirect } from 'react-router'

import config from 'config/routes'
import MyDeliveries from './MyDeliveries'
import { MyGousto } from './MyGousto'
import SubscriptionSettings from './Subscription'
import { Referral } from './Referral'
import Account from './Account'

import { checkValidSession } from '../../utils/routes'

export const accountRoutes = store => (
  <Route component={Account} onEnter={checkValidSession(store, config.client.home, true)}>
    {MyGousto}
    {MyDeliveries}
    {SubscriptionSettings}
    {Referral}
    <Redirect
      from={`${config.client.deprecated__mySubscription}*`}
      to={`${config.client.mySubscription}*`}
    />
  </Route>
)
