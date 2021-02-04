import React from 'react'
import { shallow } from 'enzyme'
import { AboutYouStep } from '../AboutYou/AboutYou'
import CheckoutButton from '../../../Components/CheckoutButton'

describe('AboutYouStep', () => {
  let wrapper
  const userProspect = jest.fn()
  const receiveRef = jest.fn()
  const submit = jest.fn()
  const trackUTMAndPromoCode = jest.fn()
  const props = {
    submit,
    userProspect,
    nextStepName: '',
    receiveRef,
    checkoutValid: false,
    trackUTMAndPromoCode
  }

  beforeEach(() => {
    wrapper = shallow(<AboutYouStep {...props} />)
  })

  test('should render AboutYou component', () => {
    expect(wrapper).toBeDefined()
  })

  test('should have CheckoutButton button', () => {
    expect(wrapper.find(CheckoutButton)).toHaveLength(1)
  })

  describe('when CheckoutButton clicked', () => {
    describe('and checkoutValid is false', () => {
      test('then trackUTMAndPromoCode should not be called', () => {
        expect(submit).not.toBeCalled()
        expect(trackUTMAndPromoCode).not.toBeCalled()
        wrapper.find(CheckoutButton).simulate('click')
        expect(submit).toBeCalled()
        expect(trackUTMAndPromoCode).not.toBeCalled()
      })
    })

    describe('and checkoutValid is true', () => {
      beforeEach(() => {
        wrapper.setProps({ checkoutValid: true })
        jest.clearAllMocks()
      })

      test('then trackUTMAndPromoCode should be called with a proper parameter', () => {
        expect(trackUTMAndPromoCode).not.toBeCalled()
        expect(userProspect).not.toBeCalled()
        expect(submit).not.toBeCalled()
        wrapper.find(CheckoutButton).simulate('click')
        expect(trackUTMAndPromoCode).toHaveBeenCalledWith('checkout_click_continue_to_delivery')
        expect(userProspect).toBeCalled()
        expect(submit).toBeCalled()
      })
    })
  })

  describe('when isCheckoutOverhaulEnabled is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        isCheckoutOverhaulEnabled: true
      })
    })

    test('then CheckoutButton should not be displayed', () => {
      expect(wrapper.find(CheckoutButton).exists()).toBeFalsy()
    })
  })
})
