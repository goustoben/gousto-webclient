import Immutable from 'immutable'
import WelcomeContainer from 'routes/Welcome/WelcomeContainer'
import WelcomeImmediate from 'routes/Welcome/VariationImmediate'
import WelcomeSubscription from 'routes/Welcome/VariationSubscription'
import WelcomeStorytelling from 'routes/Welcome/VariationStorytelling'

const { match, createMemoryHistory } = require('react-router')
const mainRoutes = require('../../src/routes').default

function reduxStoreMock(isAuthenticated) {
  return {
    getState() {
      return {
        auth: Immutable.fromJS({
          isAuthenticated: isAuthenticated,
        }),
      }
    },
  }
}

const routes = mainRoutes(reduxStoreMock(true))

describe('Welcome router', () => {
  test('should redirect to /welcome-to-gousto/* when /welcome-to-gousto-2/* is called', () => {
    const path = '/welcome-to-gousto-2/1'
    const memoryHistory = createMemoryHistory(path)
    match(
      { memoryHistory, routes, location: path },
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
      { memoryHistory, routes, location: path },
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
      { memoryHistory, routes, location: path },
      (error, redirectLocation, renderProps) => {
        if (error) {
          throw error
        }
        expect(renderProps.components[4]).toEqual(WelcomeContainer)
      },
    )
  })
  test('should display WelcomeImmediate welcome page when /welcome-to-gousto/what-happens-next is called', () => {
    const path = '/welcome-to-gousto/what-happens-next/1'
    const memoryHistory = createMemoryHistory(path)
    match(
      { memoryHistory, routes, location: path },
      (error, redirectLocation, renderProps) => {
        if (error) {
          throw error
        }
        expect(renderProps.components[4]).toEqual(WelcomeImmediate)
      },
    )
  })
  test('should display WelcomeSubscription welcome page when /welcome-to-gousto/flexible-subscription is called', () => {
    const path = '/welcome-to-gousto/flexible-subscription/1'
    const memoryHistory = createMemoryHistory(path)
    match(
      { memoryHistory, routes, location: path },
      (error, redirectLocation, renderProps) => {
        if (error) {
          throw error
        }
        expect(renderProps.components[4]).toEqual(WelcomeSubscription)
      },
    )
  })
  test('should display WelcomeStorytelling welcome page when /welcome-to-gousto/our-story is called', () => {
    const path = '/welcome-to-gousto/our-story/1'
    const memoryHistory = createMemoryHistory(path)
    match(
      { memoryHistory, routes, location: path },
      (error, redirectLocation, renderProps) => {
        if (error) {
          throw error
        }
        expect(renderProps.components[4]).toEqual(WelcomeStorytelling)
      },
    )
  })
  test('should display an error page if non-existent welcome page route is called', () => {
    const path = '/welcome-to-gousto/does-not-exist/1'
    const memoryHistory = createMemoryHistory(path)
    match(
      { memoryHistory, routes, location: path },
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
