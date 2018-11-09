import Immutable from 'immutable'
const { match, createMemoryHistory } = require('react-router')
const routes = require('../../src/routes').default(reduxStoreMock(true))

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

describe('router', () => {
  test('should display the checkout when /checkout is called', () => {
    const path = '/checkout'
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
      },
    )
  })
})
