import React from 'react'
import { Route } from 'react-router'
import SubscriptionContainer from './SubscriptionContainer'
import config from 'config/routes'

export default (
	<Route path={config.client.mySubscription2} component={SubscriptionContainer} />
)
