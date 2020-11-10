import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { Subscription } from '../Subscription'

let mountWrapper

const mockSubscriptionLoadData = jest.fn()
const mockUserLoadData = jest.fn()
const mockMenuLoadBoxPrices = jest.fn()

const defaultProps = {
  menuLoadBoxPrices: mockMenuLoadBoxPrices,
  userLoadData: mockUserLoadData,
  subscriptionLoadData: mockSubscriptionLoadData,
}

const mountWithProps = (props = {}) => {
  mountWrapper = mount(
    <Subscription
      {...defaultProps}
      {...props}
    />
  )
}

describe('Subscription', () => {
  beforeEach(() => {
    jest.resetAllMocks()

    act(() => {
      mountWithProps()
    })
  })

  describe('Given Subscription has mounted', () => {
    test('Then Subscription is rendered correctly', () => {
      expect(mountWrapper.find('Subscription').exists()).toEqual(true)
    })

    test('Then the correct actions are invoked', () => {
      expect(mockMenuLoadBoxPrices).toHaveBeenCalled()
      expect(mockUserLoadData).toHaveBeenCalled()
      expect(mockSubscriptionLoadData).toHaveBeenCalled()
    })
  })
})
