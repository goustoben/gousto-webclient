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

  const trackingOrderPlace = jest.fn()
  const touch = jest.fn()
  const submit = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <CheckoutPayment
        trackingOrderPlace={trackingOrderPlace}
        touch={touch}
        submit={submit}
      />
    )
  })

  afterEach(() => {
    trackingOrderPlace.mockClear()
    touch.mockClear()
    submit.mockClear()
  })

  describe('rendering', () => {
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

  describe('user clicks on submit button', () => {
    describe('when form is valid', () => {
      beforeEach(() => {
        wrapper.setProps({ formErrors: {} })
      })

      test('should set isSubmitCardEnabled prop to true', () => {
        expect(wrapper.state().isSubmitCardEnabled).toBe(false)

        wrapper.find(SubmitButton).simulate('click')

        expect(wrapper.state().isSubmitCardEnabled).toBe(true)
      })

      test('should call trackingOrderPlace prop with correct arguments', () => {
        wrapper.find(SubmitButton).simulate('click')

        expect(trackingOrderPlace).toHaveBeenCalledWith(true, 'checkout')
      })
    })

    describe('when form errors do have error', () => {
      const formErrors = {
        payment: {
          cardName: 'Card name is required',
          town: 'Town is required',
        }
      }
      const sectionName = 'payment'
      const formName = 'exampleForm'

      beforeEach(() => {
        wrapper.setProps({ formErrors, sectionName, formName })
      })
      
      test('should call touch for correct fields', () => {
        wrapper.find(SubmitButton).simulate('click')

        expect(touch.mock.calls.length).toBe(2)
        expect(touch.mock.calls[0][0]).toBe(formName)
        expect(touch.mock.calls[0][1]).toBe('payment[cardName]')
        expect(touch.mock.calls[1][0]).toBe(formName)
        expect(touch.mock.calls[1][1]).toBe('payment[town]')
      })
    })
  })

  describe('cardTokenReady', () => {
    test('should call props.submit', () => {
      const cardTokenReady = wrapper.find(CheckoutFrame).prop('cardTokenReady')

      cardTokenReady()

      expect(submit).toHaveBeenCalled()
    })
  })
})
