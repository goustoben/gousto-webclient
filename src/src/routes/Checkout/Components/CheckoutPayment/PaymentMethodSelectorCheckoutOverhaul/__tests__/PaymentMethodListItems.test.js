import React from 'react'
import { shallow } from 'enzyme'
import { PaymentMethodListItem } from '../PaymentMethodListItem'

describe('given PaymentMethodListItem', () => {
  let wrapper
  const props = {
    methodDescriptor: {
      paymentMethod: 'card',
      leftItem: {
        itemType: 'label',
        text: 'Card payment',
      },
      rightItem: {
        itemType: 'svg',
        className: 'className',
        fileName: 'payment-method-4-cards',
      },
    },
    currentPaymentMethod: 'card',
    setCurrentPaymentMethod: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<PaymentMethodListItem {...props} />)
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('li')).toHaveLength(1)
    expect(wrapper.find('PaymentMethodToggle').exists()).toBeTruthy()
  })
})
