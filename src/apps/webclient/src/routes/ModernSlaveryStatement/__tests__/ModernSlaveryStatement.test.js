import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import Helmet from 'react-helmet'
import { client } from 'config/routes'
import { MainLayout } from 'layouts/MainLayout'
import { routes } from 'routes'

import { ModernSlaveryStatement } from '../ModernSlaveryStatement'

const { match, createMemoryHistory } = require('react-router')

describe('ModernSlaveryStatement', () => {
  test('should display the modern slavery statement page when /modern-slavery-statement is called', () => {
    const reduxStoreMock = () => ({
      getState: () => ({}),
    })

    const currentRoutes = routes(reduxStoreMock())
    const path = client.modernSlavery
    const memoryHistory = createMemoryHistory(path)

    match(
      { memoryHistory, routes: currentRoutes, location: path },
      (error, redirectLocation, renderProps) => {
        expect(error).toEqual(null)

        expect(renderProps.components[1]).toEqual(MainLayout)
        expect(renderProps.components[2]).toEqual(ModernSlaveryStatement)
      },
    )
  })

  test('renders without crashing', () => {
    const div = document.createElement('div')

    ReactDOM.render(
      <ModernSlaveryStatement />,
      div
    )
  })

  describe('when mounted', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(<ModernSlaveryStatement />)
    })

    describe('the layout', () => {
      test('renders <ModernSlaveryStatement />', () => {
        expect(wrapper.find('ModernSlaveryStatement')).toHaveLength(1)
      })

      test('has a <Helmet /> child', () => {
        expect(wrapper.find(Helmet)).toHaveLength(1)
      })

      test('contains one section', () => {
        expect(wrapper.find('section').length).toEqual(1)
      })

      test('contains Modern Slavery Statement section', () => {
        expect(wrapper.find('section').first().text()).toContain('Modern Slavery Statement')
      })
    })
  })
})
