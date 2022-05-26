import React from 'react'

import { mount } from 'enzyme'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { RibbonIsAuthenticatedAttributeReporter } from '../RibbonIsAuthenticatedAttributeReporter'

describe('RibbonIsAuthenticatedAttributeReporter', () => {
  const ribbon = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(global as any).ribbon = ribbon
  })

  const mockStore = configureMockStore()

  describe('when mounted', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    describe('when not logged in', () => {
      beforeEach(() => {
        const state = {
          auth: Immutable.fromJS({
            isAuthenticated: false,
          }),
        }
        const mockedStore = mockStore(state)

        mount(
          <Provider store={mockedStore}>
            <RibbonIsAuthenticatedAttributeReporter />
          </Provider>,
        )
      })

      test('then it should send attribute value to ribbon', () => {
        expect(ribbon).toHaveBeenCalledWith('attribute', 'is-logged-in', false)
      })
    })

    describe('when user is logged in', () => {
      beforeEach(() => {
        const state = {
          auth: Immutable.fromJS({
            isAuthenticated: true,
          }),
        }
        const mockedStore = mockStore(state)

        mount(
          <Provider store={mockedStore}>
            <RibbonIsAuthenticatedAttributeReporter />
          </Provider>,
        )
      })

      test('then it should send the true attribute value to ribbon', () => {
        expect(ribbon).toHaveBeenCalledWith('attribute', 'is-logged-in', true)
      })
    })
  })
})
