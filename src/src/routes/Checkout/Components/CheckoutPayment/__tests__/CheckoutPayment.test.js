import React from 'react'
import { shallow } from 'enzyme'
import { Field } from 'redux-form'

import SubmitButton from 'routes/Checkout/Components/SubmitButton'
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

    test('should render a SubmitButton', () => {
      expect(wrapper.find(SubmitButton)).toHaveLength(1)
    })
  })

  describe('submitPayment', () => {
    beforeEach(() => {
      wrapper = shallow(<CheckoutPayment />)
    })

    test('should set submitCheckoutFrame prop to true', () => {
      expect(wrapper.state().submitCheckoutFrame).toBe(false)

      wrapper.find(SubmitButton).simulate('click')

      expect(wrapper.state().submitCheckoutFrame).toBe(true)
    })
  })

  describe('cardTokenReady', () => {
    const submit = jest.fn()
    
    beforeEach(() => {
      wrapper = shallow(<CheckoutPayment submit={submit} />)
    })

    test('should call props.submit', () => {
      const cardTokenReady = wrapper.find(CheckoutFrame).prop('cardTokenReady')

      cardTokenReady()

      expect(submit).toHaveBeenCalled()
    })
  })
})
