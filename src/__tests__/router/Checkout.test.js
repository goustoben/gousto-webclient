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
  test('should display the checkout when /checkout is called', () => {
    const path = '/checkout'
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
      },
    )
  })
})
