import React from 'react'
import { Route } from 'react-router'
import UnsubscribeContainer from './UnsubscribeContainer'
import configRoutes from 'config/routes'
import FullPage from 'layouts/FullPage'

export default (
	<Route component={FullPage} footerType="large">
		<Route path={configRoutes.client.unsubscribe} component={UnsubscribeContainer} />
	</Route>
)
