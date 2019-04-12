import React from 'react'
import { Route } from 'react-router'
import FullPage from 'layouts/FullPage'
import JobsContainer from './JobsContainer'
import routeConfig from 'config/routes'

export default (
  <Route component={FullPage} footerType="large">
    <Route path={`${routeConfig.client.jobs}`} component={JobsContainer} />
  </Route>
)
