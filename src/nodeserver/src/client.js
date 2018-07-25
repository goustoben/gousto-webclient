import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import routes from 'routes'
import AppContainer from 'containers/AppContainer'
import { configureStore } from './store'
import transit from 'transit-immutable-js'
import zendesk from 'utils/zendesk'
import Cookies from 'utils/GoustoCookies'
import Raven from 'raven-js'
import processCookies from 'utils/processCookies'
import processFeaturesQuery from 'utils/processFeaturesQuery'
import processQuery from 'utils/processQuery'
import loadFeatures from 'utils/loadFeatures'
import featuresLoadedFromStore from 'utils/featuresLoadedFromStore'
import actions from 'actions'
import docReady from 'utils/docReady'
import queryString from 'query-string'
import { clientAuthorise, refresh } from 'client/auth'
import browserType from 'client/browserType'

docReady('docReady', window)

if (!__TEST__ && __PROD__) {
	let url
	if (__ENV__ === 'production') {
		url = 'https://1e4757633f8442df8a0043740e0d5648@app.getsentry.com/95380'
	}
	if (__ENV__ === 'staging') {
		url = 'https://19bb1b5729834d8e922a6319fb4c01af@sentry.io/94578'
	}
	if (url) {
		Raven
			.config(url, { release: __GIT_HASH__ })
			.install()
	}
} else {
	window.gitHash = __GIT_HASH__
}

let initialState = {}
try {
	initialState = decodeURIComponent(window.atob(window.__initialState__))
} catch (error) {
	//
}

initialState = transit.fromJSON(initialState)
const store = configureStore(browserHistory, initialState, Cookies)

processCookies(Cookies, store)

const history = syncHistoryWithStore(browserHistory, store)

window.docReady(async () => {
	clientAuthorise(store)

	const setZendesk = zendesk(window.location.pathname)
	const query = queryString.parse(window.location.search)
	processFeaturesQuery(query, store)
	processQuery(query, store)

	refresh(store)

	browserType(store)

	setZendesk.getZopim(() => {
		setZendesk.chatButton()
	})

	const reactRootDOM = document.getElementById('react-root')

	if (reactRootDOM && !(initialState.serverError && initialState.serverError === '500')) {
		ReactDOM.render(
			<AppContainer
				history={history}
				routes={routes(store)}
				store={store}
			/>,
			reactRootDOM
		)
	} else {
		const e = new Error('reactRootDOM not found')
		if (Raven) {
			Raven.captureException(e)
		} else {
			console.log(e) // eslint-disable-line no-console
		}
	}
})

window.onhashchange = () => {
	if (window.location.hash.indexOf('login') !== -1) {
		store.dispatch(actions.loginVisibilityChange(true))
	}
}

window.__store__ = store // eslint-disable-line no-underscore-dangle

window.__loadFeatures__ = features => loadFeatures(features, store) // eslint-disable-line no-underscore-dangle

window.__featuresLoadedFromStore__ = features => featuresLoadedFromStore(features, store) // eslint-disable-line no-underscore-dangle

window.__authRefresh__ = refresh // eslint-disable-line no-underscore-dangle
