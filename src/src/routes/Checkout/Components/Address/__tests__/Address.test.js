import React from 'react'
import { shallow } from 'enzyme'
import { checkoutClickContinueToPayment } from 'actions/trackingKeys'
import { CheckoutButton } from 'routes/Checkout/Components/CheckoutButton'
import { Address } from '../Address'

describe('Address', () => {
  let wrapper
  const change = jest.fn()
  const untouch = jest.fn()
  const props = {
    registerField: jest.fn(),
    trackUTMAndPromoCode: jest.fn(),
    change,
    untouch,
    sectionName: 'delivery',
    formName: 'delivery',
  }

  beforeEach(() => {
    wrapper = shallow(<Address {...props} />)
  })

  test('should render by default', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('when Address renders', () => {
    test('should render CheckoutButton', () => {
      expect(wrapper.find(CheckoutButton).exists()).toBeTruthy()
    })

    test('then should render phone number, instructions and education banner', () => {
      expect(wrapper.find('DeliveryPhoneNumber').exists()).toBeTruthy()
      expect(wrapper.find('DeliveryInstruction').exists()).toBeTruthy()
      expect(wrapper.find('DeliveryEducationBanner').exists()).toBeTruthy()
    })
  })

  describe('when CheckoutButton clicked', () => {
    test('should dispatch trackUTMAndPromoCode actions with proper parameters', () => {
      wrapper.find(CheckoutButton).simulate('click')
      expect(props.trackUTMAndPromoCode).toHaveBeenCalledWith(checkoutClickContinueToPayment)
    })
  })

  describe('when reset is called', () => {
    let instance

    beforeEach(() => {
      instance = wrapper.instance()
      instance.reset('addressId', '')
    })

    test('then should call change and untouch', () => {
      expect(change).toHaveBeenCalledWith('delivery', 'delivery.addressId', '')
      expect(untouch).toHaveBeenCalledWith('delivery', 'delivery.addressId')
    })
  })
})
