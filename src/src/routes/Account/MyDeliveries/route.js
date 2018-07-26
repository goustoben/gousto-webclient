import React from 'react'
import { Route } from 'react-router'
import MyDeliveriesContainer from './MyDeliveriesContainer'
import config from 'config/routes'

export default (
	<Route path={config.client.myDeliveries2} component={MyDeliveriesContainer} />
)
