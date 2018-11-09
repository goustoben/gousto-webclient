import React from 'react'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import { Field } from 'redux-form'
import PaymentExpiryDate from 'routes/Checkout/Components/Payment/PaymentExpiryDate'

describe('PaymentExpiryDate', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PaymentExpiryDate />)
  })

  describe('rendering', () => {
    test('should return div', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should render 1 label(s)', () => {
      expect(wrapper.find('label')).toHaveLength(1)
    })

    test('should render 2 <Field /> component(s)', () => {
      expect(wrapper.find(Field)).toHaveLength(2)
    })
  })

  describe('sensitive data masking', () => {
    test('all payment <Field /> component(s) should have prop "mask"', () => {
      expect(
        wrapper
          .find(Field)
          .at(0)
          .prop('mask'),
      ).toBe(true)
      expect(
        wrapper
          .find(Field)
          .at(1)
          .prop('mask'),
      ).toBe(true)
    })
  })
})
