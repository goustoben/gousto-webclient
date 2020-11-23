import React from 'react'
import { shallow } from 'enzyme'
import TestimonialsContainer from '../TestimonialsContainer'

describe('TestimonialsContainer', () => {
  let wrapper
  const initialState = {}
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
        }
        expect(wrapper.props()).toEqual(expect.objectContaining(expected))
      })
    })
  })

  describe('Given CTA state updates', () => {
    describe('When its rendered', () => {
      beforeEach(() => {
        wrapper.setProps({
          showLink: false,
        })
      })

      test('Then should be rendered with updates', () => {
        const expected = {
          showLink: false,
        }
        expect(wrapper.props()).toEqual(expect.objectContaining(expected))
      })
    })
  })
})
