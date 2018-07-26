import React from 'react'
import { IndexRoute, Route } from 'react-router'
import Hubs from './Hubs'
import Hub from './Hub'

import MainLayout from 'layouts/MainLayout'
import routeConfig from 'config/routes'

export default (
	<Route path={routeConfig.client.cookbook} component={MainLayout} footerType="large">
		<IndexRoute component={Hubs} />
		<Route path=":collectionSlug" component={Hub} />
	</Route>
)
