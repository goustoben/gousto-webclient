import React from 'react'
import { Route } from 'react-router'
import config from 'config/routes'

import MainLayout from 'layouts/MainLayout'
import BoxPrices from './BoxPricesContainer'

export default (
  <Route component={MainLayout}>
    <Route path={config.client.boxPrices} component={BoxPrices} />
  </Route>
)
