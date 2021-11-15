import React from 'react'
import { Route, Redirect } from 'react-router'
import { WelcomeContainer } from './WelcomeContainer'
import { checkValidSession } from '../../utils/routes'
import MainLayout from "layouts/MainLayout"

export default (store) => (
  <Route component={MainLayout}>
    <Route path="welcome-to-gousto/" onEnter={checkValidSession(store, '/')}>
      <Route path=":orderId" component={WelcomeContainer} />
      <Redirect from="welcome-to-gousto-2/*" to="welcome-to-gousto/*" />
    </Route>
    <Redirect from="welcome-to-gousto-2/*" to="welcome-to-gousto/*" />
  </Route>
)
