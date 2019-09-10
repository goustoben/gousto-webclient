import React from 'react'
import { Route, Redirect } from 'react-router'
import SignupLayout from 'layouts/SignupLayout'
import { client } from 'config/routes'
import SignupContainer from './SignupContainer'

export default (
  <Route component={SignupLayout}>
    <Route path={`${client.signup}(/:stepName)`} component={SignupContainer} />
    <Redirect from="/signup-2(/:stepName)" to="/signup" />
  </Route>
)
