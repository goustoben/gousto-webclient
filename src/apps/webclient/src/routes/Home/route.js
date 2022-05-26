import React from 'react'

import { Route, IndexRoute, Redirect } from 'react-router'

import { FullPage } from 'layouts/FullPage'

import { HomeContainer } from './HomeContainer'

export const Home = (
  <Route component={FullPage} footerType="large" footerIsOnLandingPage>
    <IndexRoute component={HomeContainer} />
    <Redirect from="/home" to="/" />
  </Route>
)
