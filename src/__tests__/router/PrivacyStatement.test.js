import config from 'config'
import MainLayout from 'layouts/MainLayout'
import { match, createMemoryHistory } from 'react-router'
import PrivacyStatement from '../../src/routes/PrivacyStatement/PrivacyStatement'
import { routes } from '../../src/routes'

function reduxStoreMock() {
  return {
    getState() {
      return {}
    },
  }
}

const currentRoutes = routes(reduxStoreMock())

describe('router', () => {
  test('should display the policy statement page when /privacy-statement is called', () => {
    const path = config.routes.client.privacyPolicy
    const memoryHistory = createMemoryHistory(path)
    match(
      { memoryHistory, routes: currentRoutes, location: path },
      (error, redirectLocation, renderProps) => {
        expect(error).toEqual(null)

        expect(renderProps.components[1]).toEqual(MainLayout)
        expect(renderProps.components[2]).toEqual(PrivacyStatement)
      },
    )
  })
})
