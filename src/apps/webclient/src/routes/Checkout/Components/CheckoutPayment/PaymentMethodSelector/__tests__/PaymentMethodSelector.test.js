import React from 'react'

import { mount } from 'enzyme'

import { PaymentMethodSelector } from '../PaymentMethodSelector'

describe('given PaymentMethodSelector', () => {
  it('should be rendered correctly', () => {
    const wrapper = mount(
      <PaymentMethodSelector
        isPayPalReady
        isPayPalEligible
        currentPaymentMethod="card"
        setCurrentPaymentMethod={jest.fn()}
      />,
    )

    expect(wrapper.find('ul').exists()).toBeTruthy()
    expect(wrapper.find('input[id="Card"]').exists()).toBeTruthy()
    expect(wrapper.find('input[id="PayPal"]').exists()).toBeTruthy()
    expect(wrapper.find('PaymentMethodListItem').exists()).toBeTruthy()
  })

  it('should not render PayPal radio button if it is not eligible', () => {
    const wrapper = mount(
      <PaymentMethodSelector
        isPayPalReady
        isPayPalEligible={false}
        currentPaymentMethod="card"
        setCurrentPaymentMethod={jest.fn()}
      />,
    )

    expect(wrapper.find('ul').exists()).toBeTruthy()
    expect(wrapper.find('input[id="PayPal"]').exists()).toBeFalsy()
    expect(wrapper.find('PaymentMethodListItem').exists()).toBeTruthy()
  })
})
