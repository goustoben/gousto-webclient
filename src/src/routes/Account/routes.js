import React from 'react'
import { Route } from 'react-router'

import MyDeliveries from './MyDeliveries'
import MyGousto from './MyGousto'
import Subscription from './Subscription'
import MyDetails from './MyDetails'
import Referral from './Referral'
import RateRecipes from './RateRecipes'
import Account from './Account'

import config from 'config/routes'
import { checkValidSession } from "../../utils/routes"

export default (store) => (
  <Route component={Account} onEnter={checkValidSession(store, config.client.login)}>
    {MyGousto}
    {MyDeliveries}
    {Subscription}
    {MyDetails}
    {Referral}
    {RateRecipes}
  </Route>
)
