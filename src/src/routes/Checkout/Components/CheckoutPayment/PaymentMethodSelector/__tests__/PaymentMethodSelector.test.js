import React from 'react'
import { shallow } from 'enzyme'
import { PaymentMethodSelector } from '../PaymentMethodSelector'

describe('given PaymentMethodSelector', () => {
  let wrapper
  const props = {
    currentPaymentMethod: 'card',
    setCurrentPaymentMethod: jest.fn(),
    isPayPalReady: true,
    renderCardContent: jest.fn(),
    renderPaypalContent: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<PaymentMethodSelector {...props} />)
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('ul')).toHaveLength(1)
    expect(wrapper.find('PaymentMethodListItem').exists()).toBeTruthy()
  })
})
