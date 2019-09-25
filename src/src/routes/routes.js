import React from 'react'
import { Route } from 'react-router'

import MainLayout from 'layouts/MainLayout'
import Page from 'containers/PageContainer'

import ErrorPage from 'components/ErrorPage'
import Auth from './Auth'
import Home from './Home'
import Checkout from './Checkout' /* eslint-disable new-cap */
import Example from './Example'
import Menu from './Menu'
import Account from './Account'
import Signup from './Signup'
import Welcome from './Welcome' /* eslint-disable new-cap */
import Join from './Join' /* eslint-disable new-cap */
import Cookbook from './Cookbook'
import Jobs from './Jobs'
import ResetPassword from './ResetPassword'
import BoxPrices from './BoxPrices'
import Unsubscribe from './Unsubscribe'
import GetHelp from './GetHelp'
import OrderConfirmation from './OrderConfirmation'
import PrivacyStatement from './PrivacyStatement'
import ChoosePlan from './ChoosePlan'

export default (store) => (
  <Route path="/" component={Page}>
    {Home}
    {Signup}
    {Menu}
    {ChoosePlan(store)}
    {BoxPrices}
    {Join}
    {Cookbook}
    {Jobs}
    {ResetPassword}
    {Unsubscribe}
    {PrivacyStatement}
    {GetHelp(store)}

    <Route component={MainLayout}>
      {Auth.login}
      {Auth.logout}
      {Example}
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
