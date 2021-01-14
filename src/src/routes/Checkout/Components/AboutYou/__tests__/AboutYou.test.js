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
    expect(wrapper.find('CTA')).toHaveLength(0)
  })

  describe('when isCheckoutOverhaulEnabled is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        isCheckoutOverhaulEnabled: true
      })
    })

    test('then CheckoutButton should be displayed', () => {
      expect(wrapper.find('CTA')).toHaveLength(1)
    })

    describe('and CTA is displayed and clicked', () => {
      describe('and email && password are undefined', () => {
        test('then trackUTMAndPromoCode should not be called', () => {
          expect(submit).not.toBeCalled()
          expect(trackUTMAndPromoCode).not.toBeCalled()
          wrapper.find('CTA').simulate('click')
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
          wrapper.find('CTA').simulate('click')
          expect(trackUTMAndPromoCode).toHaveBeenCalledWith('checkout_click_continue_to_delivery')
          expect(userProspect).toBeCalled()
          expect(submit).toBeCalled()
        })
      })
    })
  })
})
