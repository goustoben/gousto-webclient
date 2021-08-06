import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { checkoutCreatePreviewOrder } from 'routes/Menu/actions/checkout'
import { CheckoutUrgencyModalContainer } from '../CheckoutUrgencyModalContainer'

jest.mock('routes/Menu/actions/checkout', () => ({
  checkoutCreatePreviewOrder: jest.fn(),
}))

describe('CheckoutUrgencyModalContainer', () => {
  let wrapper

  const state = {
    checkoutUrgency: Immutable.fromJS({
      currentStatus: 'inactive',
    }),
  }

  const store = {
    getState: () => state,
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  }

  beforeAll(() => {
    wrapper = shallow(<CheckoutUrgencyModalContainer />, { context: { store } })
  })

  test('renders correctly', () => {
    expect(wrapper.prop('isOpen')).toBe(false)
    expect(wrapper.prop('isLoading')).toBe(false)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when redirectToMenu is called from child component', () => {
    beforeEach(() => {
      wrapper.prop('redirectToMenu')()
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
      wrapper.prop('checkoutCreatePreviewOrder')()
    })

    test('then it should dispatch the correct action', () => {
      expect(checkoutCreatePreviewOrder).toHaveBeenCalledWith()
    })
  })
})
