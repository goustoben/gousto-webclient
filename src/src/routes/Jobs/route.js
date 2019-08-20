import React from 'react'
import { Route } from 'react-router'
import FullPage from 'layouts/FullPage'
import routeConfig from 'config/routes'
import Jobs from './Jobs'

export default (
  <Route component={FullPage} footerType="large">
    <Route path={`${routeConfig.client.jobs}`} component={Jobs} />
  </Route>
)
