import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import TestimonialsContainer from '../TestimonialsContainer'

describe('TestimonialsContainer', () => {
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
    wrapper = shallow(<TestimonialsContainer store={store} />)
  })

  describe('Given initialState to TestimonialsContainer component', () => {
    describe('When CTAHomePage is rendered', () => {
      test('Then should be rendered properly', () => {
        const expected = {
          showLink: true,
          enableStorystream: false,
          isHomePageRedesignEnabled: false,
        }
        const renderedHTML = wrapper.dive()
        expect(renderedHTML.exists('.testimonials.homepageRedesign')).toBeFalsy()
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
        wrapper = shallow(<TestimonialsContainer store={store} />)
        wrapper.setProps({
          showLink: false,
          enableStorystream: true,
        })
      })

      test('Then should be rendered with updates', () => {
        const expected = {
          showLink: false,
          enableStorystream: true,
          isHomePageRedesignEnabled: true,
        }
        const renderedHTML = wrapper.dive()
        expect(renderedHTML.exists('.testimonials.homepageRedesign')).toBeTruthy()
        expect(wrapper.props()).toEqual(expect.objectContaining(expected))
      })
    })
  })
})
