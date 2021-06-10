import React from 'react'
import { Route } from 'react-router'

import MainLayout from 'layouts/MainLayout'
import Page from 'containers/PageContainer'

import ErrorPage from 'components/ErrorPage'
import { Home } from './Home'
import { Checkout } from './Checkout'
import Menu from './Menu'
import Account from './Account'
import { Signup } from './Signup'
import Welcome from './Welcome'
import Cookbook from './Cookbook'
import ResetPassword from './ResetPassword'
import { BoxPrices } from './BoxPrices'
import Unsubscribe from './Unsubscribe'
import { GetHelp } from './GetHelp'
import OrderConfirmation from './OrderConfirmation'
import { Payment } from './Payment'
import { PrivacyStatement } from './PrivacyStatement'
import ChoosePlan from './ChoosePlan'
import { ModernSlaveryStatement } from './ModernSlaveryStatement'
import { MenuRedirectRoute } from './MenuRedirect'

const routes = (store) => (
  <Route path="/" component={Page}>
    {Home}
    {Signup}
    {Menu}
    {ChoosePlan(store)}
    {BoxPrices}
    {Cookbook}
    {ResetPassword}
    {Unsubscribe}
    {PrivacyStatement}
    {GetHelp(store)}
    {ModernSlaveryStatement}
    {Payment}
    {MenuRedirectRoute}

    <Route component={MainLayout}>
      {Welcome(store)}
      {Account(store)}
      {OrderConfirmation(store)}
    </Route>

    {Checkout(store)}
    <Route component={MainLayout}>
      <Route path="*" component={ErrorPage} />
    </Route>
  </Route>
)

export { routes }
