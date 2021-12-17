import React from 'react'
import { Route } from 'react-router'
import routesConfig from 'config/routes'
import MainLayout from 'layouts/MainLayout'
import { PrivacyStatement } from './PrivacyStatement'

const route = (
  <Route component={MainLayout}>
    <Route path={routesConfig.client.privacyPolicy} component={PrivacyStatement} />
  </Route>
)

export {
  route,
}
