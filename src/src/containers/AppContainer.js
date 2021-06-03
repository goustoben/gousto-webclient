import PropTypes from 'prop-types'
import React from 'react'
import { Router, applyRouterMiddleware } from 'react-router'
import { Provider, connect } from 'react-redux'
import apolloClient from 'apis/apollo'
import { useScroll } from 'react-router-scroll'
import shouldScroll from 'routes/shouldScroll'
import trackPageChange from 'routes/trackPageChange'
import hashLinkScroll from 'routes/hashLinkScroll'
import fetchContentOnChange from 'routes/fetchContentOnChange'
import { documentLocation } from 'utils/window'
import { ApolloProvider } from 'react-apollo'
import appboy from '@braze/web-sdk'

const initializeBrazeSDK = () => {
  if (typeof window !== 'undefined') {
    console.log('@@@--AppContainer.js--L17--Client side route')
    const apiKey = 'REPLACE_ME'
    const baseUrl = 'sdk.fra-01.braze.eu'

    const initializationOptions = {
      baseUrl,
      allowCrawlerActivity: false,
      allowUserSuppliedJavascript: false,
      devicePropertyAllowlist: [], // save data points
      doNotLoadFontAwesome: true, // Don't load fontawesome's icon set from CDN
      enableLogging: true, // Development only logging to browser console
      enableSdkAuthentication: false, // Not sure whether this is a requirement
      noCookies: true // Prevent having to update cookie banner?
    }

    appboy.initialize(apiKey, initializationOptions)
    appboy.openSession()

    return
  }

  console.log('@@@--AppContainer.js--L17--Server side route')
}

const AppContainer = ({ history, routes, store }) => {
  initializeBrazeSDK()

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient(store)}>
        <Router
          history={history}
          // eslint-disable-next-line
          render={__CLIENT__ ? applyRouterMiddleware(useScroll(shouldScroll)) : undefined}
          onUpdate={(() => {
            trackPageChange(store)
            hashLinkScroll()
            fetchContentOnChange(documentLocation().pathname, store)
          })}
        >
          {routes}
        </Router>
      </ApolloProvider>
    </Provider>
  )
}

AppContainer.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}

export default AppContainer
