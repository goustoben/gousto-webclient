import React from 'react'
import { Route, Redirect, IndexRoute } from 'react-router'

import configRoutes from 'config/routes'
import WizardLayout from 'layouts/WizardLayout'
import GetHelpContainer from './GetHelpContainer'
import OrderIssueContainer from './OrderIssue/OrderIssueContainer'

import { checkValidSession } from './../../utils/routes'

export default (store) => (
	<Route component={WizardLayout}>
		<Route path={configRoutes.getHelp.index} component={GetHelpContainer} onEnter={checkValidSession(store, '/')}>
			<IndexRoute component={OrderIssueContainer} />
			<Redirect to={configRoutes.client.login} />
		</Route>
	</Route>
)
