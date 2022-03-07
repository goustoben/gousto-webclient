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
    expect(wrapper.find('input[type="radio"]')).toHaveLength(2)
    expect(wrapper.find('input[type="radio"][id="Card"]').length).toBe(1)
    expect(wrapper.find('input[type="radio"][id="PayPal"]').length).toBe(1)
  })

  describe('when payment method is selected', () => {
    beforeEach(() => {
      wrapper.find('input[id="PayPal"]').simulate('click')
    })

    test('then setCurrentPaymentMethod should be called with proper parameter', () => {
      expect(setCurrentPaymentMethod).toHaveBeenCalledWith('PayPal')
    })
  })
})
