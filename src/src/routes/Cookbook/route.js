import React from 'react'
import { IndexRoute, Route } from 'react-router'
import MainLayout from 'layouts/MainLayout'
import routeConfig from 'config/routes'
import Hubs from './Hubs'
import Hub from './Hub'

export default (
  <Route path={routeConfig.client.cookbook} component={MainLayout} footerType="large">
    <IndexRoute component={Hubs} />
    <Route path=":collectionSlug" component={Hub} />
  </Route>
)
