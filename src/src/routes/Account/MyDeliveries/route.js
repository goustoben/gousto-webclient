import React from 'react'
import { Route } from 'react-router'
import config from 'config/routes'
import MyDeliveriesContainer from './MyDeliveriesContainer'

export default (
  <Route path={config.client.myDeliveries2} component={MyDeliveriesContainer} />
)
