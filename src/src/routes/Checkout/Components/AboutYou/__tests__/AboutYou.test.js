import React from 'react'
import { shallow } from 'enzyme'
import { checkoutClickContinueToDelivery } from 'actions/trackingKeys'
import { AboutYou } from '../AboutYou'

describe('Given AboutYou component', () => {
  let wrapper
  const receiveRef = jest.fn()
  const submit = jest.fn()
  const trackUTMAndPromoCode = jest.fn()
  const props = {
    submit,
    nextStepName: '',
    receiveRef,
    checkoutValid: false,
    trackUTMAndPromoCode,
  }

  beforeEach(() => {
    wrapper = shallow(<AboutYou {...props} />)
  })

  test('should render AboutYou component', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  test('should render CheckoutButton button', () => {
    expect(wrapper.find('Connect(CheckoutButton)').exists()).toBeTruthy()
  })

  describe('when togglePasswordVisibility is called', () => {
    beforeEach(() => {
      const instance = wrapper.instance()
      instance.togglePasswordVisibility()
    })

    test('then state should be changed', () => {
      expect(wrapper.state('isPassVisible')).toBeTruthy()
    })
  })

  describe('when toggleCriteria is called', () => {
    beforeEach(() => {
      const instance = wrapper.instance()
      instance.toggleCriteria()
    })

    test('then state should be changed', () => {
      expect(wrapper.state('isPassCriteriaVisible')).toBeTruthy()
    })
  })

  describe('when toggleFailedCriteria is called', () => {
    beforeEach(() => {
      const instance = wrapper.instance()
      instance.toggleFailedCriteria()
    })

    test('then state should be changed', () => {
      expect(wrapper.state('showFailedCriteria')).toBeTruthy()
    })
  })

  describe('when handleSubmit is called', () => {
    describe('and checkoutValid is true', () => {
      beforeEach(() => {
        wrapper.setProps({
          checkoutValid: true,
        })
        const instance = wrapper.instance()
        instance.handleSubmit()
      })

      test('then trackUTMAndPromoCode should be called', () => {
        expect(trackUTMAndPromoCode).toHaveBeenCalledWith(checkoutClickContinueToDelivery)
      })

      test('then submit should be called', () => {
        expect(submit).toHaveBeenCalled()
      })
    })
  })
})
