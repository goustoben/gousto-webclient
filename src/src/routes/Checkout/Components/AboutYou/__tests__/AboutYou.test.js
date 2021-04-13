import React from 'react'
import { shallow } from 'enzyme'
import { AboutYou } from '../AboutYou'

describe('Given AboutYou component', () => {
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
    wrapper = shallow(<AboutYou {...props} />)
  })

  test('should render AboutYou component', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  test('should not have CheckoutButton button', () => {
    expect(wrapper.find('Connect(CheckoutButton)')).toHaveLength(0)
  })

  describe('when isCheckoutOverhaulEnabled is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        isCheckoutOverhaulEnabled: true
      })
    })

    test('then CheckoutButton should be displayed', () => {
      expect(wrapper.find('Connect(CheckoutButton)')).toHaveLength(1)
    })

    describe('and CheckoutButton is clicked', () => {
      describe('and email && password are undefined', () => {
        test('then trackUTMAndPromoCode should not be called', () => {
          expect(submit).not.toBeCalled()
          expect(trackUTMAndPromoCode).not.toBeCalled()
          wrapper.find('Connect(CheckoutButton)').simulate('click')
          expect(submit).toBeCalled()
          expect(trackUTMAndPromoCode).not.toBeCalled()
        })
      })

      describe('and checkoutValid is true', () => {
        beforeEach(() => {
          wrapper.setProps({
            createAccountValues: {
              email: 'test@test.com',
              password: 'passworddddd',
            }
          })
          jest.clearAllMocks()
        })

        test('then trackUTMAndPromoCode should be called with a proper parameter', () => {
          expect(trackUTMAndPromoCode).not.toBeCalled()
          expect(userProspect).not.toBeCalled()
          expect(submit).not.toBeCalled()
          wrapper.find('Connect(CheckoutButton)').simulate('click')
          expect(trackUTMAndPromoCode).toHaveBeenCalledWith('checkout_click_continue_to_delivery')
          expect(userProspect).toBeCalled()
          expect(submit).toBeCalled()
        })
      })
    })
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
})
