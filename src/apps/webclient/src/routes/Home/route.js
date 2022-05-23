import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import { FullPage } from 'layouts/FullPage'
import { Home as HomeContainer } from './Home'

export const Home = (
  <Route component={FullPage} footerType="large" footerIsOnLandingPage>
    <IndexRoute component={HomeContainer} />
    <Redirect from="/home" to="/" />
  </Route>
)
