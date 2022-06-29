import React from 'react'
import { Route } from 'react-router'

import { MainLayout } from 'layouts/MainLayout'
import { FullPage } from 'layouts/FullPage/FullPage'
import { PageContainer } from 'containers/PageContainer'

import ErrorPage from 'components/ErrorPage'
import { Home } from './Home'
import { Checkout } from './Checkout'
import { MenuRoute } from './Menu'
import Account from './Account'
import { Signup } from './Signup'
import Welcome from './Welcome'
import { ResetPasswordContainer } from './ResetPassword'
import configRoutes from '../config/routes'
import { BoxPrices } from './BoxPrices'
import { UnsubscribeRoute } from './Unsubscribe'
import { GetHelp } from './GetHelp'
import { OrderConfirmationRoute } from './OrderConfirmation'
import { Payment } from './Payment'
import { PrivacyStatement } from './PrivacyStatement'
import { ModernSlaveryStatement } from './ModernSlaveryStatement'

const routes = (store) => (
  <Route path="/" component={PageContainer}>
    {Home}
    {Signup}
    {MenuRoute}
    {BoxPrices}
    <Route component={FullPage} footerType="large">
      <Route path={configRoutes.client.resetPassword} component={ResetPasswordContainer} />
    </Route>
    {UnsubscribeRoute}
    {PrivacyStatement}
    {GetHelp(store)}
    {ModernSlaveryStatement}
    {Payment}

    <Route component={MainLayout}>
      {Welcome(store)}
      {Account(store)}
      {OrderConfirmationRoute(store)}
    </Route>

    {Checkout(store)}
    <Route component={MainLayout}>
      <Route path="*" component={ErrorPage} />
    </Route>
  </Route>
)

export { routes }
