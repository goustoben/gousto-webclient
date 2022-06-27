import React from 'react'

import { Route, Redirect } from 'react-router'

import { client } from 'config/routes'
import { SignupLayout } from 'layouts/SignupLayout'

import { SignupContainer } from './SignupContainer'

export const Signup = (
  <Route component={SignupLayout}>
    <Route path={`${client.signup}(/:secondarySlug)`} component={SignupContainer} />
    <Redirect from="/signup-2(/:secondarySlug)" to="/signup" />
  </Route>
)
