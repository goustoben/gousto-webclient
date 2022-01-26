import React from 'react'
import { Route } from 'react-router'
import config from 'config'
import MainLayout from 'layouts/MainLayout'
import { PrivacyStatement } from './PrivacyStatement'

const route = (
  <Route component={MainLayout}>
    <Route path={config.routes.client.privacyPolicy} component={PrivacyStatement} />
  </Route>
)

export {
  route,
}
