import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { Field } from 'redux-form'
import PaymentSecurityCode from 'routes/Checkout/Components/SagePayPayment/PaymentSecurityCode'
import CheckoutTooltip from 'routes/Checkout/Components/CheckoutTooltip/CheckoutTooltip'

describe('PaymentSecurityCode', () => {
  let wrapper
  let handleSecurityCodeChange

  beforeEach(() => {
    handleSecurityCodeChange = sinon.spy()
    wrapper = shallow(<PaymentSecurityCode />)
  })

  describe('rendering', () => {
    test('should return div', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should render 1 <Field> component(s)', () => {
      expect(wrapper.find(Field)).toHaveLength(1)
    })

    test('should render 2 <CheckoutTooltip> component(s)', () => {
      expect(wrapper.find(CheckoutTooltip)).toHaveLength(2)
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
    })
  })
})
