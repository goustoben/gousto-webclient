import React from 'react'
import { shallow } from 'enzyme'
import { PaymentMethodSelectorCheckoutOverhaul } from '../PaymentMethodSelectorCheckoutOverhaul'

describe('given PaymentMethodSelectorCheckoutOverhaul', () => {
  let wrapper
  const props = {
    currentPaymentMethod: 'card',
    setCurrentPaymentMethod: jest.fn(),
    isPayPalReady: true,
    renderCardContent: jest.fn(),
    renderPaypalContent: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<PaymentMethodSelectorCheckoutOverhaul {...props} />)
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('ul')).toHaveLength(1)
    expect(wrapper.find('PaymentMethodListItem').exists()).toBeTruthy()
  })
})
