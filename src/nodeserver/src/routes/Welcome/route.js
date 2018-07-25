import React from 'react'
import { Route, Redirect } from 'react-router'
import WelcomeContainer from './WelcomeContainer'
import WelcomeImmediate from './VariationImmediate'
import WelcomeSubscription from './VariationSubscription'
import WelcomeStorytelling from './VariationStorytelling'
import { checkValidSession } from './../../utils/routes'

export default (store) => (
	<Route>
		<Route path="welcome-to-gousto/" onEnter={checkValidSession(store, '/')}>
			<Route path=":orderId" component={WelcomeContainer} />
			<Route path="why-gousto/:orderId" component={WelcomeContainer} />
			<Route path="what-happens-next/:orderId" component={WelcomeImmediate} />
			<Route path="flexible-subscription/:orderId" component={WelcomeSubscription} />
			<Route path="our-story/:orderId" component={WelcomeStorytelling} />
			<Redirect from="welcome-to-gousto-2/*" to="welcome-to-gousto/*" />
		</Route>
		<Redirect from="welcome-to-gousto-2/*" to="welcome-to-gousto/*" />
	</Route>
)
