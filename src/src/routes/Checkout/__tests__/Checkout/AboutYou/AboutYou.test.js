import sinon from 'sinon'

import { Field, FormSection } from 'redux-form'

import React from 'react'
import { shallow } from 'enzyme'
import { AboutYou } from 'routes/Checkout/Components/AboutYou/AboutYou'

describe('AboutYou', () => {
  let wrapper
  let checkoutStepValidation

  beforeEach(() => {
    checkoutStepValidation = sinon.spy()
    wrapper = shallow(<AboutYou checkoutStepValidation={checkoutStepValidation} />)
  })

  describe('rendering', () => {
    test('should return FormSection', () => {
      expect(wrapper.type()).toEqual(FormSection)
    })

    test('should render 5 Fields', () => {
      expect(wrapper.find(Field).length).toEqual(5)
    })
  })

  describe('props', () => {
    describe('inputs with a mask', () => {
      test('should be true for "mask" for first name, last name, email, password, and marketing checkboxes', () => {
        const fields = Array.from(5)
        fields.forEach((index) => {
          expect(wrapper.find(Field).at(index).prop('mask')).toBeTruthy()
        })
      })
    })
  })

  test('should return proper title - About You', () => {
    expect(wrapper.find('h3').text()).toEqual('About you')
  })

  test('should have Log in here button', () => {
    expect(wrapper.find('.link').text().includes('Log in here')).toBeTruthy()
  })

  test('should return About you title', () => {
    expect(wrapper.find('h3').text()).toEqual('About you')
  })
})
