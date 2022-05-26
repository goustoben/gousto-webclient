import React from 'react'

import { Route, Redirect } from 'react-router'

import { client } from 'config/routes'
import { SignupLayout } from 'layouts/SignupLayout'

import { SignupContainer } from './SignupContainer'

export const Signup = (
  <Route component={SignupLayout}>
    <Route path={`${client.signup}(/:stepName)`} component={SignupContainer} />
    <Redirect from="/signup-2(/:stepName)" to="/signup" />
  </Route>
)
