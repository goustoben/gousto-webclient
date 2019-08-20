import Immutable from 'immutable'
import Jobs from 'routes/Jobs/Jobs'
const { match, createMemoryHistory } = require('react-router')
const routes = require('../../src/routes').default(reduxStoreMock(true))

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

describe('router', () => {
  test('should display the jobs page when /jobs is called', () => {
    const path = '/jobs'
    const memoryHistory = createMemoryHistory(path)
    match(
      { memoryHistory, routes, location: path },
      (error, redirectLocation, renderProps) => {
        if (error) {
          throw error
        }
        expect(renderProps.components[2]).toEqual(Jobs)
      },
    )
  })
})
