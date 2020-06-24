import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { ModuleHeaderContainer } from '../ModuleHeaderContainer'

describe('ModuleHeaderContainer', () => {
  let wrapper
  const initialState = {
    features: Immutable.Map({
      isHomePageRedesignEnabled: Immutable.fromJS({
        value: false
      }),
    }),
  }
  const store = {
    getState: jest.fn(() => initialState),
    dispatch: jest.fn(),
    subscribe: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(<ModuleHeaderContainer store={store} />)
  })

  describe('Given initialState to ModuleHeaderContainer component', () => {
    describe('When its rendered', () => {
      test('Then should be rendered with properly', () => {
        const expected = {
          size: 'big',
          isHomePageRedesignEnabled: false,
        }
        const renderedHTML = wrapper.dive()
        expect(renderedHTML.exists('.header.big')).toBeTruthy()
        expect(renderedHTML.exists('.container.homepageRedesign')).toBeFalsy()
        expect(renderedHTML.exists('.fontStyleXL')).toBeFalsy()
        expect(wrapper.props()).toEqual(expect.objectContaining(expected))
      })
    })
  })

  describe('Given state updates', () => {
    describe('When its rendered', () => {
      beforeEach(() => {
        store.getState.mockReturnValue({
          ...initialState,
          features: Immutable.Map({
            isHomePageRedesignEnabled: Immutable.fromJS({
              value: true
            }),
          }),
        })
        wrapper = shallow(<ModuleHeaderContainer store={store} />)
      })

      test('Then should be rendered with the updated properties', () => {
        const expected = {
          size: 'big',
          isHomePageRedesignEnabled: true,
        }
        const renderedHTML = wrapper.dive()
        expect(renderedHTML.exists('.container.homepageRedesign')).toBeTruthy()
        expect(renderedHTML.exists('.fontStyleXL')).toBeTruthy()
        expect(renderedHTML.exists('.header.big')).toBeFalsy()
        expect(wrapper.props()).toEqual(expect.objectContaining(expected))
      })
    })
  })
})
