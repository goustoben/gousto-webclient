import React from 'react'
import { Route, Redirect, IndexRoute } from 'react-router'

import configRoutes from 'config/routes'
import WizardLayout from 'layouts/WizardLayout'
import GetHelpContainer from './GetHelpContainer'
import OrderIssueContainer from './OrderIssue/OrderIssueContainer'

import Refund from './Refund'
import Contact from './Contact'
import Confirmation from './Confirmation'

import { checkValidSession } from './../../utils/routes'

export default (store) => {
	const onEnterHandler = (routes, replace, next) => {
		const state = store.getState()
		const redirectTo = '/'
		const hasGetHelpFlag = state.features.getIn(['getHelp', 'value'])

		// redirect user to the `/` in case auth session is not found
		checkValidSession(store, redirectTo)(routes, replace, next)

		if (!hasGetHelpFlag) {
			replace(redirectTo)
			next()
		}
	}

	return (
		<Route component={WizardLayout}>
			<Route
				path={configRoutes.client.getHelp.index}
				component={GetHelpContainer}
				onEnter={onEnterHandler}
			>
				<IndexRoute component={OrderIssueContainer} />
				{Refund}
				{Contact}
				{Confirmation}
				<Redirect to={configRoutes.client.login} />
			</Route>
		</Route>
	)
}
