import React from 'react'
import { Route, Redirect } from 'react-router'
import WelcomeContainer from './WelcomeContainer'
import { checkValidSession } from "../../utils/routes"

export default (store) => (
  <Route>
    <Route path="welcome-to-gousto/" onEnter={checkValidSession(store, '/')}>
      <Route path=":orderId" component={WelcomeContainer} />
      <Route path="why-gousto/:orderId" component={WelcomeContainer} />
      <Redirect from="welcome-to-gousto-2/*" to="welcome-to-gousto/*" />
    </Route>
    <Redirect from="welcome-to-gousto-2/*" to="welcome-to-gousto/*" />
  </Route>
)
