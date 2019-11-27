import React from 'react'
import { Route } from 'react-router'
import config from 'config'
import MainLayout from 'layouts/MainLayout'
import { OrderAddOnsContainer } from './OrderAddOnsContainer'

const route = (
  <Route component={MainLayout}>
    <Route path={config.routes.client.orderAddOns} component={OrderAddOnsContainer} />
  </Route>
)

export {
  route
}
