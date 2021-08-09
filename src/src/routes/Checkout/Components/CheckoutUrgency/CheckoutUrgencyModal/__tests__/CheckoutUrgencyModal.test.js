import React from 'react'
import { mount } from 'enzyme'
import { CheckoutUrgencyContext } from '../../CheckoutUrgencyContext'
import { CheckoutUrgencyModal } from '../CheckoutUrgencyModal'

describe('CheckoutUrgencyModal', () => {
  let wrapper

  const checkoutCreatePreviewOrder = jest.fn()
  const checkoutUrgencySetCurrentStatus = jest.fn()
  const redirectToMenu = jest.fn()
  const trackCheckoutUrgencyAction = jest.fn()

  const render = (remainingSeconds) => {
    wrapper = mount(
      <CheckoutUrgencyModal
        isOpen
        isLoading={false}
        checkoutCreatePreviewOrder={checkoutCreatePreviewOrder}
        checkoutUrgencySetCurrentStatus={checkoutUrgencySetCurrentStatus}
        redirectToMenu={redirectToMenu}
        modalSeconds={180}
        trackCheckoutUrgencyAction={trackCheckoutUrgencyAction}
      />,
      {
        wrappingComponent: CheckoutUrgencyContext.Provider,
        wrappingComponentProps: { value: remainingSeconds },
      }
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when remainingSeconds is more than 0', () => {
    beforeEach(() => {
      render(120)
    })

    test('then it renders correctly', () => {
      expect(wrapper.find('.header').text()).toBe('Your session is about to expire')
      expect(wrapper.find('Clock').props()).toMatchObject({
        seconds: 120,
        total: 180,
        isCritical: false,
      })
      expect(wrapper.find('.explanation').text()).toBe(
        'Continue with checkout to avoid losing your recipes'
      )
      expect(wrapper.find('CTA .content').text()).toBe('Continue with checkout')
    })

    describe('and when the modal is closed', () => {
      beforeEach(() => {
        wrapper.find('.cta').simulate('click')
      })

      test('then it should re-request order preview', () => {
        expect(checkoutCreatePreviewOrder).toHaveBeenCalled()
      })
    })
  })

  describe('when remainingSeconds is 0', () => {
    beforeEach(() => {
      render(0)
    })

    test('then it renders correctly', () => {
      expect(wrapper.find('.header').text()).toBe('Your session has expired')
      expect(wrapper.find('Clock').props()).toMatchObject({
        seconds: 0,
        total: 180,
        isCritical: true,
      })
      expect(wrapper.find('.explanation').text()).toBe(
        'Go back to the menu to check your recipes are still in stock'
      )
      expect(wrapper.find('CTA .content').text()).toBe('Back to the menu')
    })

    describe('and when the modal is closed', () => {
      beforeEach(() => {
        wrapper.find('.cta').simulate('click')
      })

      test('then it should redirect to menu', () => {
        expect(redirectToMenu).toHaveBeenCalled()
      })
    })
  })
})
