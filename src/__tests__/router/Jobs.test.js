import Immutable from 'immutable'
import Jobs from 'routes/Jobs/Jobs'
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

describe('router', () => {
  test('should display the jobs page when /jobs is called', () => {
    const path = '/jobs'
    const memoryHistory = createMemoryHistory(path)
    match(
      { memoryHistory, routes: currentRoutes, location: path },
      (error, redirectLocation, renderProps) => {
        if (error) {
          throw error
        }
        expect(renderProps.components[2]).toEqual(Jobs)
      },
    )
  })
})
