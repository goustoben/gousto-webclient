import routeConfig from 'config/routes'
import Hubs from 'routes/Cookbook/Hubs'
import Hub from 'routes/Cookbook/Hub'
import MainLayout from 'layouts/MainLayout'
import { match, createMemoryHistory } from 'react-router'
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
  test('should display the cookbook hub page when /cookbook is called', () => {
    const path = routeConfig.client.cookbook
    const memoryHistory = createMemoryHistory(path)
    match(
      { memoryHistory, routes: currentRoutes, location: path },
      (error, redirectLocation, renderProps) => {
        expect(error).toEqual(null)

        expect(renderProps.components[1]).toEqual(MainLayout)
        expect(renderProps.components[2]).toEqual(Hubs)
      },
    )
  })

  test('should display the cookbook hub page when /cookbook/<slug> is called', () => {
    const path = `${routeConfig.client.cookbook}/123`
    const memoryHistory = createMemoryHistory(path)
    match(
      { memoryHistory, routes: currentRoutes, location: path },
      (error, redirectLocation, renderProps) => {
        expect(error).toEqual(null)

        expect(renderProps.components[1]).toEqual(MainLayout)
        expect(renderProps.components[2]).toEqual(Hub)
      },
    )
  })
})
