/* eslint-disable no-underscore-dangle */
import Immutable, { Iterable } from 'immutable'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import reducers from 'reducers'
import { reducer as reduxFormReducer } from 'redux-form'
import { createLogger } from 'redux-logger'
import trackingMiddleware from 'middlewares/tracking/middleware'
import persistenceMiddleware from 'middlewares/persist/middleware'
import facebookPixel from 'middlewares/tracking/facebook'
import pinterestPixel from 'middlewares/tracking/pinterest'
import snowplow from 'middlewares/tracking/snowplow'
import snowplowV2 from 'middlewares/tracking/snowplow/V2'
import { optimizelyTracker } from 'middlewares/tracking/optimizely'
import { gtmMiddleware } from 'middlewares/tracking/gtm'
import affiliateWindow from 'middlewares/tracking/affiliateWindow'
import { dataLayerTracker } from 'middlewares/tracking/dataLayerTracker'
import persistenceConfig from 'config/storePersistence'
import globals from 'config/globals'

class GoustoStore {
  constructor() {
    this.store = {
      getState: () => ({}),
    }
  }

  configureStore(history, initialState, cookies) {
    const middleware = [
      thunk,
      routerMiddleware(history),
      trackingMiddleware(snowplow),
      trackingMiddleware(affiliateWindow),
      trackingMiddleware(facebookPixel, 'v2'),
      trackingMiddleware(pinterestPixel, 'v2'),
      trackingMiddleware(snowplowV2, 'v2'),
      trackingMiddleware(gtmMiddleware, 'v2'),
      trackingMiddleware(dataLayerTracker, 'v2'),
      optimizelyTracker,
    ]

    if (globals.dev && globals.client && !window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) { // eslint-disable-line no-underscore-dangle
      const stateTransformer = (state) => {
        const newState = {}
        for (const i of Object.keys(state)) {
          if (Iterable.isIterable(state[i])) {
            newState[i] = state[i].toJS()
          } else {
            newState[i] = state[i]
          }
        }

        return newState
      }
      middleware.push(createLogger({ stateTransformer }))
    }

    if (cookies && globals.client) {
      middleware.push(persistenceMiddleware(persistenceConfig, cookies))
    }

    const composeEnhancers = globals.client && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function'
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        // This is has to be greater than the default limit of 10
        // because we have so many middlewares in between the call
        // and were the action was called.
        traceLimit: 20,
        serialize: {
          immutable: Immutable,
        }
      }) : compose

    this.store = createStore(
      combineReducers({ ...reducers, routing: routerReducer, form: reduxFormReducer}),
      initialState,
      composeEnhancers(applyMiddleware(...middleware))
    )

    return this.store
  }
}

const goustoStore = new GoustoStore()

export default goustoStore

export const configureStore = (history, initialState, cookies) => goustoStore.configureStore(history, initialState, cookies)

export const getStore = () => goustoStore.store
