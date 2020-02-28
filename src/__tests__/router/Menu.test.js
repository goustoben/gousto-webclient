import Immutable from 'immutable'
import { match, createMemoryHistory } from 'react-router'
import { routes } from '../../src/routes'

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

const currentRoutes = routes(reduxStoreMock(true))

describe('router', () => {
  describe('when /menu is called', () => {
    const path = '/menu'

    test('should display the menu', () => {
      const memoryHistory = createMemoryHistory(path)
      match(
        { memoryHistory, routes: currentRoutes, location: path },
        (error, redirectLocation, renderProps) => {
          if (error) {
            throw error
          }
          expect(renderProps.components[1].displayName).toEqual(
            'Connect(Menu)',
          )
          expect(renderProps.components[2].displayName).toEqual('Connect(MenuRecipesPage)')
        },
      )
    })
  })

  describe('when /menu/:orderId is called', () => {
    const path = '/menu/1234'

    test('should display the menu', () => {
      const memoryHistory = createMemoryHistory(path)
      match(
        { memoryHistory, routes: currentRoutes, location: path },
        (error, redirectLocation, renderProps) => {
          if (error) {
            throw error
          }
          expect(renderProps.components[1].displayName).toEqual(
            'Connect(Menu)',
          )
          expect(renderProps.components[2].displayName).toEqual('Connect(MenuRecipesPage)')
        },
      )
    })
  })

  describe('when /menu/food-brand/:slug is called', () => {
    const path = '/menu/food-brand/10-minute-meals'

    test('should display the food brand page', () => {
      const memoryHistory = createMemoryHistory(path)
      match(
        { memoryHistory, routes: currentRoutes, location: path },
        (error, redirectLocation, renderProps) => {
          if (error) {
            throw error
          }
          expect(renderProps.components[1].displayName).toEqual(
            'Connect(Menu)',
          )
          expect(renderProps.components[2].displayName).toEqual('Connect(FilteredRecipePage)')
        },
      )
    })
  })

  describe('when /menu/thematic/:slug is called', () => {
    const path = '/menu/thematic/10-minute-meals'

    test('should display the thematic page', () => {
      const memoryHistory = createMemoryHistory(path)
      match(
        { memoryHistory, routes: currentRoutes, location: path },
        (error, redirectLocation, renderProps) => {
          if (error) {
            throw error
          }
          expect(renderProps.components[1].displayName).toEqual(
            'Connect(Menu)',
          )
          expect(renderProps.components[2].displayName).toEqual('Connect(FilteredRecipePage)')
        },
      )
    })
  })
})
