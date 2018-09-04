import React from 'react'
import { Route, IndexRoute } from 'react-router'

import configRoutes from 'config/routes'
import WizardLayout from 'layouts/WizardLayout'
import GetHelpContainer from './GetHelpContainer'
import OrderIssueContainer from './OrderIssue/OrderIssueContainer'

import ContactUs from './ContactUs'

// import { checkValidSession } from './../../utils/routes'

export default () => (
	<Route component={WizardLayout}>
		{/* <Route path={configRoutes.client.getHelp.index} component={GetHelpContainer} onEnter={checkValidSession(store, '/')}> */}
		<Route path={configRoutes.client.getHelp.index} component={GetHelpContainer}>
			<IndexRoute component={OrderIssueContainer} />
			{ContactUs}
			{/* <Redirect to={configRoutes.client.login} /> */}
		</Route>
	</Route>
)
