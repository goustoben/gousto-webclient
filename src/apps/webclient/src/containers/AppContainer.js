import PropTypes from 'prop-types'
import React from 'react'
import { Router, applyRouterMiddleware } from 'react-router'
import { Provider } from 'react-redux'
import { useScroll } from 'react-router-scroll'
import { SWRConfig } from 'swr'
import { shouldScroll } from 'routes/shouldScroll'
import { trackPageChange } from 'routes/trackPageChange'
import { hashLinkScroll } from 'routes/hashLinkScroll'
import fetchContentOnChange from 'routes/fetchContentOnChange'
import { documentLocation } from 'utils/window'
import { SetupOptimizelyOverride } from 'containers/OptimizelyRollouts'
import { ConfigProvider } from './ConfigProvider'

export const AppContainer = ({ history, routes, store }) => (
  <Provider store={store}>
    <SetupOptimizelyOverride />
    <SWRConfig
      value={{
        revalidateOnFocus: false,
      }}
    >
      <ConfigProvider>
        <Router
          history={history}
          // eslint-disable-next-line
          render={__CLIENT__ ? applyRouterMiddleware(useScroll(shouldScroll)) : undefined}
          onUpdate={() => {
            trackPageChange(store)
            hashLinkScroll()
            fetchContentOnChange(documentLocation().pathname, store)
          }}
        >
          {routes}
        </Router>
      </ConfigProvider>
    </SWRConfig>
  </Provider>
)

AppContainer.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.node.isRequired,
  store: PropTypes.object.isRequired,
}
