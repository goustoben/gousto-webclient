import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { checkoutCreatePreviewOrder } from 'routes/Menu/actions/checkout'
import {
  checkoutUrgencySetCurrentStatus,
  trackCheckoutUrgencyAction,
} from 'routes/Checkout/checkoutActions'
import { CheckoutUrgencyModalContainer } from '../CheckoutUrgencyModalContainer'

jest.mock('routes/Menu/actions/checkout', () => ({
  checkoutCreatePreviewOrder: jest.fn(),
}))

jest.mock('routes/Checkout/checkoutActions', () => ({
  checkoutUrgencySetCurrentStatus: jest.fn(),
  trackCheckoutUrgencyAction: jest.fn(),
}))

describe('CheckoutUrgencyModalContainer', () => {
  let wrapper

  const state = {
    checkoutUrgency: Immutable.fromJS({
      currentStatus: 'inactive',
    }),
    features: Immutable.fromJS({
      checkoutUrgency: { value: true },
    }),
  }

  const store = {
    getState: () => state,
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  }

  beforeAll(() => {
    wrapper = shallow(<CheckoutUrgencyModalContainer store={store} />)
  })

  test('renders correctly', () => {
    expect(wrapper.find('CheckoutUrgencyModal').prop('isOpen')).toBe(false)
    expect(wrapper.find('CheckoutUrgencyModal').prop('isLoading')).toBe(false)
    expect(wrapper.find('CheckoutUrgencyModal').prop('modalSeconds')).toBe(3 * 60)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when redirectToMenu is called from child component', () => {
    beforeEach(() => {
      wrapper.find('CheckoutUrgencyModal').prop('redirectToMenu')()
    })

    test('then it should dispatch the correct action', () => {
      expect(store.dispatch).toBeCalledWith({
        type: '@@router/CALL_HISTORY_METHOD',
        payload: {
          args: ['/menu'],
          method: 'push',
        },
      })
    })
  })

  describe('when checkoutCreatePreviewOrder is called from child component', () => {
    beforeEach(() => {
      wrapper.find('CheckoutUrgencyModal').prop('checkoutCreatePreviewOrder')()
    })

    test('then it should dispatch the correct action', () => {
      expect(checkoutCreatePreviewOrder).toHaveBeenCalledWith()
    })
  })

  describe('when checkoutUrgencySetCurrentStatus is called from child component', () => {
    beforeEach(() => {
      wrapper.find('CheckoutUrgencyModal').prop('checkoutUrgencySetCurrentStatus')('running')
    })

    test('then it should dispatch the correct action', () => {
      expect(checkoutUrgencySetCurrentStatus).toHaveBeenCalledWith('running')
    })
  })

  describe('when trackCheckoutUrgencyAction is called from child component', () => {
    beforeEach(() => {
      wrapper.find('CheckoutUrgencyModal').prop('trackCheckoutUrgencyAction')('tracking_key')
    })

    test('then it should dispatch the correct action', () => {
      expect(trackCheckoutUrgencyAction).toHaveBeenCalledWith('tracking_key')
    })
  })
})
