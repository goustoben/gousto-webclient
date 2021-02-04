import React from 'react'
import { shallow } from 'enzyme'
import { Button } from 'goustouicomponents'
import { clickUseThisAddress } from '../../../../../actions/trackingKeys'
import Address from '../../Address/Address'

describe('Address', () => {
  let wrapper
  const props = {
    registerField: jest.fn(),
    trackUTMAndPromoCode: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(<Address {...props} />)
  })

  test('should render by default', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('when Address renders', () => {
    test('should render Button', () => {
      expect(wrapper.find(Button).exists()).toBeTruthy()
    })
  })

  describe('when Button clicked', () => {
    test('should dispatch trackUTMAndPromoCode actions with proper parameters', () => {
      wrapper.find(Button).simulate('click')
      expect(props.trackUTMAndPromoCode).toHaveBeenCalledWith(clickUseThisAddress)
    })
  })

  describe('when isCheckoutOverhaulEnabled is true', () => {
    const change = jest.fn()
    const untouch = jest.fn()

    beforeEach(() => {
      wrapper.setProps({
        isCheckoutOverhaulEnabled: true,
        change,
        untouch,
        formName: 'delivery',
        sectionName: 'delivery',
        formValues: {
          delivery: {
            postcodeTemp: 'w3 7up',
            notFound: false,
            postcode: '',
            addressId: '',
          }
        },
      })
    })

    test('then should render phone number, instructions and education banner', () => {
      expect(wrapper.find('DeliveryPhoneNumber').exists()).toBeTruthy()
      expect(wrapper.find('DeliveryInstruction').exists()).toBeTruthy()
      expect(wrapper.find('DeliveryEducationBanner').exists()).toBeTruthy()
    })

    describe('and reset is called', () => {
      let instance
      beforeEach(() => {
        instance = wrapper.instance()
        instance.reset('addressId')
      })

      test('then should call change and untouch', () => {
        expect(change).toHaveBeenCalledWith('delivery', 'delivery.addressId', '')
        expect(untouch).toHaveBeenCalledWith('delivery', 'delivery.addressId')
      })
    })
  })
})
