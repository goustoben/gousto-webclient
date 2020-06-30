import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import home from 'config/home'
import { CTAHomepageContainer } from '../CTAHomepageContainer'

describe('CTAHomepageContainer', () => {
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
    wrapper = shallow(<CTAHomepageContainer store={store} />)
  })

  describe('Given initialState to CTAHomepageContainer component', () => {
    describe('When CTAHomePage is rendered', () => {
      test('Then should be rendered properly', () => {
        const expected = {
          withContainer: true,
          align: 'center',
          responsive: false,
          isHomePageRedesignEnabled: false,
        }
        const renderedHTML = wrapper.dive()
        expect(renderedHTML.exists('.buttonContainer.homepageRedesign')).toBeFalsy()
        expect(wrapper.props()).toEqual(expect.objectContaining(expected))
      })
    })
  })

  describe('Given CTA state updates', () => {
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
        wrapper = shallow(<CTAHomepageContainer store={store} />)
        wrapper.setProps({ responsive: true })
      })

      test('Then should be rendered with updates', () => {
        const expected = {
          responsive: true,
          isHomePageRedesignEnabled: true,
        }
        const renderedHTML = wrapper.dive()
        expect(renderedHTML.exists('.buttonContainer.homepageRedesign.fontStyleBodyL')).toBeTruthy()
        expect(renderedHTML.contains(home.CTA.mainRedesign)).toBeTruthy()
        expect(wrapper.props()).toEqual(expect.objectContaining(expected))
      })
    })
  })
})
