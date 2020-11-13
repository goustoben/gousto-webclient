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
  isSubscriptionActive: true
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

  describe('Given isSubscriptionActive true', () => {
    beforeEach(() => {
      jest.resetAllMocks()

      act(() => {
        mountWithProps({
          isSubscriptionActive: true
        })
      })
    })

    test('Then renders ActiveSubscription', () => {
      expect(mountWrapper.find('ActiveSubscription').exists()).toBeTruthy()
    })

    test('Then does not render PausedSubscription', () => {
      expect(mountWrapper.find('PausedSubscription').exists()).toBeFalsy()
    })
  })

  describe('Given isSubscriptionActive false', () => {
    beforeEach(() => {
      jest.resetAllMocks()

      act(() => {
        mountWithProps({
          isSubscriptionActive: false
        })
      })
    })

    test('Then renders PausedSubscription', () => {
      expect(mountWrapper.find('PausedSubscription').exists()).toBeTruthy()
    })

    test('Then does not render ActiveSubscription', () => {
      expect(mountWrapper.find('ActiveSubscription').exists()).toBeFalsy()
    })
  })
})
