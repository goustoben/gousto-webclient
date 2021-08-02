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
    const path = '/get-help'

    describe.each([
      [true, '/get-help'],
      [false, '/'],
    ])('and authentication is set to %s', (isAuthenticated, expectedRedirect) => {
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
