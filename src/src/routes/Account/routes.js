import React from 'react'
import { Route } from 'react-router'

import config from 'config/routes'
import MyDeliveries from './MyDeliveries'
import MyGousto from './MyGousto'
import Subscription from './Subscription'
import MyDetails from './MyDetails'
import Referral from './Referral'
import RateRecipes from './RateRecipes'
import Account from './Account'

import { checkValidSession } from '../../utils/routes'

export const accountRoutes = store => (
  <Route component={Account} onEnter={checkValidSession(store, config.client.home, true)}>
    {MyGousto}
    {MyDeliveries}
    {Subscription}
    {MyDetails}
    {Referral}
    {RateRecipes}
  </Route>
)
