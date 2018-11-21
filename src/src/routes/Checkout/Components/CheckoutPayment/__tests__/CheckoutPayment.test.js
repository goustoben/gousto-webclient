import React from 'react'
import { shallow } from 'enzyme'
import { Field } from 'redux-form'

import { PaymentHeader } from 'routes/Checkout/Components/PaymentHeader'
import { BillingAddress } from 'routes/Checkout/Components/BillingAddress'
import { CheckoutFrame } from 'routes/Checkout/Components/CheckoutPayment/CheckoutFrame'

import { CheckoutPayment } from 'routes/Checkout/Components/CheckoutPayment/CheckoutPayment'

describe('CheckoutPayment', () => {
  let wrapper

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallow(<CheckoutPayment />)
    })

    test('should render a PaymentHeader', () => {
      expect(wrapper.find(PaymentHeader)).toHaveLength(1)
    })

    test('should render a CheckoutFrame', () => {
      expect(wrapper.find(CheckoutFrame)).toHaveLength(1)
    })

    test('should render a Name input', () => {
      expect(wrapper.find(Field).first().prop('name')).toBe('cardName')
    })

    test('should render a BillingAddress', () => {
      expect(wrapper.find(BillingAddress)).toHaveLength(1)
    })
  })
})
