import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { checkoutUrgencyStatuses } from 'routes/Checkout/checkoutUrgencyConfig'
import { CheckoutUrgencyController } from '../CheckoutUrgencyController'
import { CheckoutUrgencyContext } from '../CheckoutUrgencyContext'

jest.useFakeTimers()

describe('CheckoutUrgencyController', () => {
  let wrapper

  const checkoutUrgencySetCurrentStatus = jest.fn()
  const trackCheckoutUrgencyAction = jest.fn()

  const render = (currentStatus, startSeconds = 60, modalSeconds = 30) => {
    wrapper = mount(
      <CheckoutUrgencyController
        currentStatus={currentStatus}
        checkoutUrgencySetCurrentStatus={checkoutUrgencySetCurrentStatus}
        trackCheckoutUrgencyAction={trackCheckoutUrgencyAction}
        startSeconds={startSeconds}
        modalSeconds={modalSeconds}
      >
        <CheckoutUrgencyContext.Consumer>
          {(value) => <div id="remainingSeconds">{`${value}`}</div>}
        </CheckoutUrgencyContext.Consumer>
      </CheckoutUrgencyController>,
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when status is inactive', () => {
    beforeEach(() => {
      render(checkoutUrgencyStatuses.inactive)
    })

    test('then remainingSeconds should be null', () => {
      expect(wrapper.find('#remainingSeconds').text()).toBe('null')
    })
  })

  describe('when status changes to running', () => {
    beforeEach(() => {
      render(checkoutUrgencyStatuses.inactive)
      wrapper.setProps({ currentStatus: checkoutUrgencyStatuses.running })
    })

    test('then it should initialize remainingSeconds and start the timer', () => {
      expect(wrapper.find('#remainingSeconds').text()).toBe('60')
    })
  })

  describe('when running and some time passes', () => {
    beforeEach(() => {
      render(checkoutUrgencyStatuses.inactive)
      wrapper.setProps({ currentStatus: checkoutUrgencyStatuses.running })
      act(() => {
        jest.runOnlyPendingTimers()
      })
    })

    test('then it should tick the timer down', () => {
      expect(wrapper.find('#remainingSeconds').text()).toBe('59')
    })
  })

  describe('when running but the form is submitting, and some time passes', () => {
    beforeEach(() => {
      render(checkoutUrgencyStatuses.inactive)
      wrapper.setProps({ currentStatus: checkoutUrgencyStatuses.running, submitting: true })
      act(() => {
        jest.runOnlyPendingTimers()
      })
    })

    test('then it should not tick the timer down', () => {
      expect(wrapper.find('#remainingSeconds').text()).toBe('60')
    })
  })

  describe('when runningAndModalOpen and some time passes', () => {
    beforeEach(() => {
      render(checkoutUrgencyStatuses.inactive)
      wrapper.setProps({ currentStatus: checkoutUrgencyStatuses.running })
      wrapper.setProps({ currentStatus: checkoutUrgencyStatuses.runningAndModalOpen })
      act(() => {
        jest.runOnlyPendingTimers()
      })
    })

    test('then it should tick the timer down', () => {
      expect(wrapper.find('#remainingSeconds').text()).toBe('59')
    })
  })

  describe('when running and it is time to open the modal', () => {
    beforeEach(() => {
      render(checkoutUrgencyStatuses.inactive, 61, 60)
      wrapper.setProps({ currentStatus: checkoutUrgencyStatuses.running })
      act(() => {
        jest.runOnlyPendingTimers()
      })
    })

    test('then it should open the modal and track it', () => {
      expect(checkoutUrgencySetCurrentStatus).toHaveBeenCalledWith(
        checkoutUrgencyStatuses.runningAndModalOpen,
      )
      expect(trackCheckoutUrgencyAction).toHaveBeenCalledWith('checkout_urgency_modal_displayed', {
        time_remaining: 1,
      })
    })
  })

  describe('when running and it is time to expire', () => {
    beforeEach(() => {
      render(checkoutUrgencyStatuses.inactive, 1)
      wrapper.setProps({ currentStatus: checkoutUrgencyStatuses.running })
      act(() => {
        jest.runOnlyPendingTimers()
      })
    })

    test('then it should change state to finishedAndModalOpen and track it', () => {
      expect(checkoutUrgencySetCurrentStatus).toHaveBeenCalledWith(
        checkoutUrgencyStatuses.finishedAndModalOpen,
      )
      expect(trackCheckoutUrgencyAction).toHaveBeenCalledWith(
        'checkout_session_expired_modal_displayed',
      )
    })
  })
})
