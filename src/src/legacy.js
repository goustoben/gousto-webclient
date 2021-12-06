import React from 'react'
import ReactDOM from 'react-dom'
import transit from 'transit-immutable-js'
import { Provider } from 'react-redux'
import Footer from 'Footer'
import { Header } from 'Header'
import actions from 'actions'
import { getIsAuthenticated } from 'selectors/auth'
import processFeaturesQuery from 'utils/processFeaturesQuery'
import { processQuery } from 'utils/processQuery'
import { loadFeatures } from 'utils/loadFeatures'
import { loadVariants } from 'utils/loadVariants'
import queryString from 'query-string'
import Cookies from 'utils/GoustoCookies'
import { promoToggleModalVisibility } from 'actions/promos'
import { clientAuthorise, refresh } from 'client/auth'
import { browserHistory } from 'react-router'
import { browserType } from 'client/browserType'
import { configureStore } from './store'

let loaded = false

window.__LEGACY__ = true // eslint-disable-line

async function init() {
  loaded = true
  let initialState = {}
  try {
    initialState = transit.fromJSON(window.__initialState__)
  } catch (error) {
    //
  }

  const store = configureStore(browserHistory, initialState, Cookies)
  const persist = store.getState().persist.get('simpleHeader', false)

  clientAuthorise(store)

  const query = queryString.parse(window.location.search)
  processFeaturesQuery(query, store)
  processQuery(query, store, {hashTag: window.location.hash})
  refresh(store)

  browserType(store)

  const header = document.querySelector('#nodeHeaderReactRoot')

  if (header) {
    const simpleHeader = document.location.pathname === '/checkout'
    ReactDOM.render(
      <Provider store={store}>
        <Header simple={simpleHeader} path={document.location.pathname} />
      </Provider>,
      header
    )
  }

  const footer = document.querySelector('footer')

  if (footer) {
    const simple = document.location.pathname === '/join' || persist
    ReactDOM.render(
      <Provider store={store}>
        <Footer simple={simple} />
      </Provider>,
      footer
    )
  }
  const isOfLoginHashTag = window.location.hash.indexOf('login') !== -1
  const isNotAuthenticated = !getIsAuthenticated(store.getState())

  if (isOfLoginHashTag && isNotAuthenticated) {
    store.dispatch(actions.loginVisibilityChange(true))
  }

  window.onhashchange = () => {
    if (isOfLoginHashTag && isNotAuthenticated) {
      store.dispatch(actions.loginVisibilityChange(true))
    }
  }

  window.showNewRecoveryFlow = () => {
    store.dispatch(actions.subscriptionPauseStart())
  }

  window.__loadFeatures__ = features => loadFeatures(features, store) // eslint-disable-line no-underscore-dangle

  window.__loadVariants__ = variants => loadVariants(variants, store) // eslint-disable-line no-underscore-dangle

  window.__store__ = store // eslint-disable-line no-underscore-dangle

  window.__authRefresh__ = refresh // eslint-disable-line no-underscore-dangle

  if (store.getState().promoCurrent && !store.getState().promoModalVisible) {
    store.dispatch(promoToggleModalVisibility(true))
  }
}

function initIfReady() {
  if (document.readyState === 'interactive' && !loaded) {
    init()
  }
}

initIfReady()
document.onreadystatechange = initIfReady
