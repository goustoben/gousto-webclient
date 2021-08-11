import Immutable from 'immutable'
import { match, createMemoryHistory } from 'react-router'
import { getHelpRoutes } from '../routes'

jest.mock('utils/window', () => ({
  redirect: jest.fn(),
}))

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

describe('given Get Help routes is rendered', () => {
  describe('when get-help is called', () => {
    let currentRoutes
    let memoryHistory

    describe.each([
      [true, '/get-help', '/get-help'],
      [false, '/get-help', '/'],
      [false, '/get-help/contact', '/get-help/contact']
    ])('and authentication is set to %s', (isAuthenticated, path, expectedRedirect) => {
      beforeEach(() => {
        currentRoutes = getHelpRoutes(reduxStoreMock(isAuthenticated))
        memoryHistory = createMemoryHistory(path)
      })

      test(`locate customer to ${expectedRedirect}` , () => {
        match(
          { memoryHistory, routes: currentRoutes, location: path },

          (error, redirectLocation, renderProps) => {
            if (error) {
              throw error
            }

            const redirectTo = redirectLocation && redirectLocation.pathname
            const locateCustomerTo = redirectTo || renderProps.location.pathname

            expect(locateCustomerTo).toEqual(expectedRedirect)
          },
        )
      })
    })
  })
})
