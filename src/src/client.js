import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { routes } from 'routes'
import AppContainer from 'containers/AppContainer'
import transit from 'transit-immutable-js'
import Cookies from 'utils/GoustoCookies'
import { processCookies } from 'utils/processCookies'
import processFeaturesQuery from 'utils/processFeaturesQuery'
import processQuery from 'utils/processQuery'
import loadFeatures from 'utils/loadFeatures'
import { loadVariants } from 'utils/loadVariants'
import featuresLoadedFromStore from 'utils/featuresLoadedFromStore'
import actions from 'actions'
import docReady from 'utils/docReady'
import queryString from 'query-string'
import { clientAuthorise, refresh } from 'client/auth'
import browserType from 'client/browserType'
import { getIsAuthenticated } from 'selectors/auth'
import optimizelyRollouts from 'config/head/optimizelyRollouts'
import { configureStore } from './store'
import { setMenuFeature } from './routes/Menu/actions/menuFeatures'
import { getIsEnabledRecipeTileFoundation } from './routes/Menu/selectors/menu'

const optimizelySdk = require('@optimizely/optimizely-sdk')

docReady('docReady', window)

let initialState = {}
try {
  initialState = decodeURIComponent(window.atob(window.__initialState__))
} catch (error) {
  //
}

initialState = transit.fromJSON(initialState)

const store = configureStore(browserHistory, initialState, Cookies)

processCookies(Cookies, store)
store.dispatch(actions.setUTMSource())

const optimizelyRolloutsInstance = optimizelySdk.createInstance({
  sdkKey: optimizelyRollouts[__ENV__], //eslint-disable-line
})

const history = syncHistoryWithStore(browserHistory, store)

window.docReady(() => {
  clientAuthorise(store)

  const isFeatureInStore = getIsEnabledRecipeTileFoundation(store.getState())

  if (!isFeatureInStore) {
    const userId = store.getState().auth.get('id')
    optimizelyRolloutsInstance.onReady().then(() => {
      const featureKey = 'recipe_tile_foundations'
      const recipeTileFoundationsValue = optimizelyRolloutsInstance.isFeatureEnabled(featureKey, userId)
      store.dispatch(setMenuFeature(featureKey, recipeTileFoundationsValue))
    })
  }
  const query = queryString.parse(window.location.search)
  processFeaturesQuery(query, store)
  processQuery(query, store, {hashTag: window.location.hash})

  refresh(store)

  browserType(store)

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
    console.log(new Error('reactRootDOM not found')) // eslint-disable-line no-console
  }
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

window.__authRefresh__ = refresh // eslint-disable-line no-underscore-dangle
