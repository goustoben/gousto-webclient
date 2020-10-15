import React from 'react'
import { Route } from 'react-router'
import config from 'config/routes'

import MainLayout from 'layouts/MainLayout'
import { BoxPricesContainer } from './BoxPricesContainer'

export default (
  <Route component={MainLayout}>
    <Route path={config.client.boxPrices} component={BoxPricesContainer} />
  </Route>
)
