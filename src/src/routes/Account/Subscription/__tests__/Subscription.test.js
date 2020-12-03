import React from 'react'
import { shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import * as useSubscriptionDataHook from '../hooks/useSubscriptionData'
import { getIsSubscriptionActive } from '../context/selectors/subscription'
import { Subscription } from '../Subscription'

jest.mock('../context/selectors/subscription')
jest.mock('../ActiveSubscription', () => ({
  ActiveSubscription: () => <div />
}))

let mountWrapper

const defaultProps = {
  accessToken: 'auth-token',
  isMobile: false,
  postcode: 'W14'
}

const mountWithProps = (props = {}) => {
  act(() => {
    mountWrapper = shallow(
      <Subscription
        {...defaultProps}
        {...props}
      />
    )
  })
}

describe('Subscription', () => {
  const useSubscriptionDataSpy = jest.spyOn(useSubscriptionDataHook, 'useSubscriptionData')

  beforeEach(() => {
    jest.resetAllMocks()
    mountWithProps()
  })

  describe('Given Subscription has mounted', () => {
    test('Then useSubscriptionData was called', () => {
      expect(useSubscriptionDataSpy).toHaveBeenCalled()
    })
  })

  describe('Given isSubscriptionActive true', () => {
    beforeEach(() => {
      getIsSubscriptionActive.mockReturnValue(true)
      mountWithProps()
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
      mountWithProps()
    })

    test('Then renders PausedSubscription', () => {
      expect(mountWrapper.find('PausedSubscription').exists()).toBeTruthy()
    })

    test('Then does not render ActiveSubscription', () => {
      expect(mountWrapper.find('ActiveSubscription').exists()).toBeFalsy()
    })
  })
})
