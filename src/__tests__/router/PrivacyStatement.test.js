import config from 'config'
import MainLayout from 'layouts/MainLayout'
import PrivacyStatement from '../../src/routes/PrivacyStatement/PrivacyStatement'
const { match, createMemoryHistory } = require('react-router')
const routes = require('../../src/routes').default(reduxStoreMock())

function reduxStoreMock() {
  return {
    getState() {
      return {}
    },
  }
}

describe('router', () => {
  test('should display the policy statement page when /privacy-statement is called', () => {
    const path = config.routes.client.privacyPolicy
    const memoryHistory = createMemoryHistory(path)
    match(
      { memoryHistory, routes, location: path },
      (error, redirectLocation, renderProps) => {
        expect(error).toEqual(null)

        expect(renderProps.components[1]).toEqual(MainLayout)
        expect(renderProps.components[2]).toEqual(PrivacyStatement)
      },
    )
  })
})
