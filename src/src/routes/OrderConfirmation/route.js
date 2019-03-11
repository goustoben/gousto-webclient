import React from 'react'
import { Route } from 'react-router'
import config from 'config/routes'
import OrderConfirmation from './OrderConfirmationContainer'

export default (
	<Route path={config.client.orderConfirmation} component={OrderConfirmation} />
)
