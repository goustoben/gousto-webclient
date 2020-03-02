import Immutable from 'immutable'
import WelcomeContainer from 'routes/Welcome/WelcomeContainer'

import { match, createMemoryHistory } from 'react-router'
import { routes } from '../../src/routes'

function reduxStoreMock(isAuthenticated) {
  return {
    getState() {
      return {
        auth: Immutable.fromJS({
          isAuthenticated,
        }),
      }
    },
  }
}

const currentRoutes = routes(reduxStoreMock(true))

describe('Welcome router', () => {
  test('should redirect to /welcome-to-gousto/* when /welcome-to-gousto-2/* is called', () => {
    const path = '/welcome-to-gousto-2/1'
    const memoryHistory = createMemoryHistory(path)
    match(
      { memoryHistory, routes: currentRoutes, location: path },
      (error, redirectLocation) => {
        if (error) {
          throw error
        }

        expect(redirectLocation.pathname).toEqual('/welcome-to-gousto/1')
      },
    )
  })
  test('should display the welcome skeleton when /welcome-to-gousto is called with orderId', () => {
    const path = '/welcome-to-gousto/1'
    const memoryHistory = createMemoryHistory(path)
    match(
      { memoryHistory, routes: currentRoutes, location: path },
      (error, redirectLocation, renderProps) => {
        if (error) {
          throw error
        }

        expect(renderProps.components[4]).toEqual(WelcomeContainer)
      },
    )
  })
  test('should display WelcomeContainer welcome page when /welcome-to-gousto/why-gousto is called', () => {
    const path = '/welcome-to-gousto/why-gousto/1'
    const memoryHistory = createMemoryHistory(path)
    match(
      { memoryHistory, routes: currentRoutes, location: path },
      (error, redirectLocation, renderProps) => {
        if (error) {
          throw error
        }
        expect(renderProps.components[4]).toEqual(WelcomeContainer)
      },
    )
  })

  test('should display an error page if non-existent welcome page route is called', () => {
    const path = '/welcome-to-gousto/does-not-exist/1'
    const memoryHistory = createMemoryHistory(path)
    match(
      { memoryHistory, routes: currentRoutes, location: path },
      (error, redirectLocation, renderProps) => {
        if (error) {
          throw error
        }
        expect(renderProps.components[1].displayName).toEqual(
          'Connect(MainLayout)',
        )
        expect(renderProps.components[2].displayName).toEqual(
          'Connect(ErrorPage)',
        )
      },
    )
  })
})
