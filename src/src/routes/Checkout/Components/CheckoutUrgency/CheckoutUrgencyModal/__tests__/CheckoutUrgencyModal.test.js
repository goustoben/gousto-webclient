import React from 'react'
import { mount } from 'enzyme'
import { CheckoutUrgencyContext } from '../../CheckoutUrgencyContext'
import { CheckoutUrgencyModal } from '../CheckoutUrgencyModal'

describe('CheckoutUrgencyModal', () => {
  let wrapper

  const checkoutCreatePreviewOrder = jest.fn()
  const redirectToMenu = jest.fn()

  const render = (remainingSeconds) => {
    wrapper = mount(
      <CheckoutUrgencyModal
        isOpen
        isLoading={false}
        checkoutCreatePreviewOrder={checkoutCreatePreviewOrder}
        redirectToMenu={redirectToMenu}
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
      render(600)
    })

    test('then it renders correctly', () => {
      // TODO check rendering
      expect(wrapper.find('.modalHeaderHeading').text()).toBe('Your session is about to expire')
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
      // TODO check rendering
      expect(wrapper.find('.modalHeaderHeading').text()).toBe('Your session has expired')
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
