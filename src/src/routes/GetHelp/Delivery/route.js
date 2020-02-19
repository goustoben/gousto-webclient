import React from 'react'
import { Route } from 'react-router'
import configRoutes from 'config/routes'
import { DeliveryContainer } from './DeliveryContainer'

const Delivery = (
  <Route
    path={configRoutes.client.getHelp.delivery}
    component={DeliveryContainer}
  />
)

export {
  Delivery
}
