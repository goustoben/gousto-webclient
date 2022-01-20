import config from 'config'
import MainLayout from 'layouts/MainLayout'
import { PrivacyStatement } from '../PrivacyStatement/PrivacyStatement'
import { routes } from '../routes'
const { match, createMemoryHistory } = require('react-router')

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
