import React from 'react'
import { Route } from 'react-router'
import config from 'config/routes'

import MainLayout from 'layouts/MainLayout'
import { MenuRedirectContainer as MenuRedirect } from './MenuRedirectContainer'

const MenuRedirectRoute = (
  <Route component={MainLayout}>
    <Route path={config.client.menu2} component={MenuRedirect} />
  </Route>
)

export {
  MenuRedirectRoute
}
