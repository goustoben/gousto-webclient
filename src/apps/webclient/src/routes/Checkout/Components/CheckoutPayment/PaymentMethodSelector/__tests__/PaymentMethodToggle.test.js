import React from 'react'
import { shallow } from 'enzyme'
import { PaymentMethodToggle } from '../PaymentMethodToggle'

describe('given PaymentMethodToggle', () => {
  let wrapper
  const methodDescriptor = {
    paymentMethod: 'card',
    leftItem: {
      itemType: 'label',
      text: 'item description',
      className: 'className',
    },
    rightItem: {
      itemType: 'svg',
      className: 'className',
      fileName: 'payment-method-4-cards',
    },
    renderContent: jest.fn(),
  }
  const setCurrentPaymentMethod = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <PaymentMethodToggle
        methodDescriptor={methodDescriptor}
        setCurrentPaymentMethod={setCurrentPaymentMethod}
      />,
    )
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('.paymentMethodToggle')).toHaveLength(1)
    expect(wrapper.find('InputRadio').exists()).toBeTruthy()
    expect(wrapper.find('Svg').exists()).toBeTruthy()
  })

  describe('when payment method is selected', () => {
    beforeEach(() => {
      wrapper.find('InputRadio').simulate('change')
    })

    test('then setCurrentPaymentMethod should be called with proper parameter', () => {
      expect(setCurrentPaymentMethod).toHaveBeenCalledWith('card')
    })
  })

  describe('when itemType is not correct', () => {
    const methodDescriptorWithoutItemType = {
      paymentMethod: 'card',
      leftItem: {
        itemType: 'card',
        text: 'item description',
        className: 'className',
      },
      rightItem: {
        itemType: '',
      },
      renderContent: jest.fn(),
    }

    beforeEach(() => {
      wrapper.setProps({
        methodDescriptor: methodDescriptorWithoutItemType,
      })
    })

    test('then should render only left item', () => {
      expect(wrapper.find('Svg').exists()).toBeFalsy()
    })
  })
})
