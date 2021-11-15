import React from 'react'
import { Route } from 'react-router'

import config from 'config/routes'
import MyDeliveries from './MyDeliveries'
import { MyGousto } from './MyGousto'
import SubscriptionSettings from './Subscription'
import { Referral } from './Referral'
import Account from './Account'

import { checkValidSession } from '../../utils/routes'
import MainLayout from "layouts/MainLayout"

export const accountRoutes = store => (
  <Route component={MainLayout}>
    <Route component={Account} onEnter={checkValidSession(store, config.client.home, true)}>
      {MyGousto}
      {MyDeliveries}
      {SubscriptionSettings}
      {Referral}
    </Route>
  </Route>
)
