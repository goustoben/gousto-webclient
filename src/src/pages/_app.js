// import App from 'next/app'
import React from 'react'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
// import { routes } from 'routes'
import { AppContainer } from 'containers/AppContainer'
import transit from 'transit-immutable-js'
import Cookies from 'utils/GoustoCookies'
import { processCookies } from 'utils/processCookies'
import processFeaturesQuery from 'utils/processFeaturesQuery'
import { processQuery } from 'utils/processQuery'
import { loadFeatures } from 'utils/loadFeatures'
import { loadVariants } from 'utils/loadVariants'
import { featuresLoadedFromStore } from 'utils/featuresLoadedFromStore'
import actions from 'actions'
import { docReady } from 'utils/docReady'
import queryString from 'query-string'
import { clientAuthorise, refresh } from 'client/auth'
import { browserType } from 'client/browserType'
import { getIsAuthenticated } from 'selectors/auth'
import { initializeDatadog } from '../middlewares/datadog/initialize'
import { configureStore } from '../store'
// import { initializePerformanceTrackerSender } from '../performanceTracker/initializePerformanceTrackerSender' // eslint-disable-line no-underscore-dangle

import bootstrap from 'styles/bootstrap.scss'

let initialState = {}
try {
  initialState = transit.fromJSON(window.__initialState__)
} catch (error) {
  //
}

const store = configureStore(browserHistory, initialState, Cookies)

store.dispatch(actions.setUTMSource())

let history
if (typeof global.window !== 'undefined') {
  history = syncHistoryWithStore(browserHistory, store)

  processCookies(Cookies, store)

  docReady('docReady', window)

  window.docReady(() => {
    clientAuthorise(store)
    const query = queryString.parse(window.location.search)
    processFeaturesQuery(query, store)
    processQuery(query, store, {hashTag: window.location.hash})

    refresh(store)

    browserType(store)

    // initializePerformanceTrackerSender(store)

    initializeDatadog()
  })

  window.onhashchange = () => {
    const isOfLoginHashTag = window.location.hash.indexOf('login') !== -1
    const isNotAuthenticated = !getIsAuthenticated(store.getState())
    if (isOfLoginHashTag && isNotAuthenticated) {
      store.dispatch(actions.loginVisibilityChange(true))
    }
  }

  window.__store__ = store // eslint-disable-line no-underscore-dangle

  window.__loadFeatures__ = features => loadFeatures(features, store) // eslint-disable-line no-underscore-dangle

  window.__loadVariants__ = variants => loadVariants(variants, store) // eslint-disable-line no-underscore-dangle

  window.__featuresLoadedFromStore__ = features => featuresLoadedFromStore(features, store) // eslint-disable-line no-underscore-dangle

  window.__authRefresh__ = refresh
}

function MyApp({ Component, pageProps }) {
  return (
    <AppContainer
      history={history}
      // routes={routes(store)}
      store={store}
    >
      <Component {...pageProps} />
    </AppContainer>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp

