import React from 'react'
import { mount } from 'enzyme'
import { PaymentMethodSelector } from '../PaymentMethodSelector'

describe('given PaymentMethodSelector', () => {
  let wrapper
  const setCurrentPaymentMethod = jest.fn()

  const props = {
    currentPaymentMethod: 'Card',
    setCurrentPaymentMethod,
    isPayPalReady: true,
  }

  beforeEach(() => {
    wrapper = mount(<PaymentMethodSelector {...props} />)
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('fieldset[role="group"]')).toHaveLength(1)
    expect(wrapper.find('input[type="radio"]')).toHaveLength(2)
    expect(wrapper.find('input[type="radio"][id="Card"]').length).toBe(1)
    expect(wrapper.find('input[type="radio"][id="PayPal"]').length).toBe(1)
  })

  test('should have the current payment method checked', () => {
    expect(wrapper.find('input[id="Card"]').prop('checked')).toBe(true)
    expect(wrapper.find('input[id="PayPal"]').prop('checked')).toBe(false)
  })

  describe('when payment method is selected', () => {
    beforeEach(() => {
      wrapper.find('input[id="PayPal"]').simulate('click')
    })

    test('then setCurrentPaymentMethod should be called with proper parameter', () => {
      expect(setCurrentPaymentMethod).toHaveBeenCalledWith('PayPal')
    })
  })

  describe('when is paypal ready', () => {
    test('should render the correct paypal label', () => {
      expect(wrapper.find('label[htmlFor="PayPal"]').text().includes('Connected')).toBe(true)
    })
  })

  describe('when is not paypal ready', () => {
    beforeEach(() => {
      wrapper = mount(
        <PaymentMethodSelector
          isPayPalReady={false}
          setCurrentPaymentMethod={setCurrentPaymentMethod}
          currentPaymentMethod="Card"
        />
      )
    })

    test('should render the correct paypal label', () => {
      expect(wrapper.find('label[htmlFor="PayPal"]').text().includes('Connected')).toBe(false)
    })
  })
})
