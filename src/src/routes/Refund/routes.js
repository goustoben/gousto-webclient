import React from 'react'
import { Route, Redirect, IndexRoute } from 'react-router'

import configRoutes from 'config/routes'
import WizardLayout from 'layouts/WizardLayout'
import RefundContainer from './RefundContainer'
import { checkValidSession } from './../../utils/routes'


import RefundCategories from './RefundCategories'
import RefundCategoriesContainer from './RefundCategories/RefundCategoriesContainer'

export default (store) => (
	<Route component={WizardLayout}>
		<Route path={configRoutes.getHelp.index} component={RefundContainer} onEnter={checkValidSession(store, '/')}>
			{RefundCategories}
			<IndexRoute component={RefundCategoriesContainer} />
			<Redirect to={configRoutes.client.login} />
		</Route>
	</Route>
)
