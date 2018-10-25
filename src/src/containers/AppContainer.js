import PropTypes from 'prop-types'
import React from 'react'
import { Router, applyRouterMiddleware } from 'react-router'
import { Provider } from 'react-redux'
import apolloClient from 'apis/apollo'
import { useScroll } from 'react-router-scroll'
import shouldScroll from 'routes/shouldScroll'
import trackPageChange from 'routes/trackPageChange'
import hashLinkScroll from 'routes/hashLinkScroll'
import fetchContentOnChange from 'routes/fetchContentOnChange'
import { documentLocation } from 'utils/window'
import { ApolloProvider } from 'react-apollo'

const AppContainer = ({ history, routes, store }) => (
	<Provider store={store}>
		<ApolloProvider client={apolloClient(store)}>
			<Router
				history={history}
				children={routes}
				render={__CLIENT__ ? applyRouterMiddleware(useScroll(shouldScroll)) : undefined}
				onUpdate={(() => {
					trackPageChange(store)
					hashLinkScroll()
					fetchContentOnChange(documentLocation().pathname, store)
				})}
			/>
		</ApolloProvider>
	</Provider>
)

AppContainer.propTypes = {
	history: PropTypes.object.isRequired,
	routes: PropTypes.object.isRequired,
	store: PropTypes.object.isRequired,
}

export default AppContainer
