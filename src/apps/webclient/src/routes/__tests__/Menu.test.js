import Immutable from 'immutable'
import { MenuRecipesPageWrapper } from 'routes/Menu/MenuRecipesPage/MenuRecipesPageWrapper'
import { routes } from '../routes'
const { match, createMemoryHistory } = require('react-router')

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
            'withIsActionBarRedesignEnabled(Connect(Menu))',
          )
          expect(renderProps.components[2]).toEqual(MenuRecipesPageWrapper)
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
            'withIsActionBarRedesignEnabled(Connect(Menu))',
          )
          expect(renderProps.components[2]).toEqual(MenuRecipesPageWrapper)
        },
      )
    })
  })
})
