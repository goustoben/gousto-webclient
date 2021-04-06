import React from 'react'
import { shallow } from 'enzyme'
import menuFetchData from 'routes/Menu/fetchData'
import Link from 'Link'
import { Cookbook } from '../Cookbook'
import { Notification } from '../Notification'
import { HeaderContainer } from '../Header'
import { ReferAFriend } from '../ReferAFriend'
import { MyGousto } from '../MyGousto'

jest.mock('routes/Menu/fetchData')

describe('MyGousto', () => {
  let wrapper
  const userLoadOrdersSpy = jest.fn()
  const userGetReferralDetails = jest.fn()
  const trackClickRateRecipesSpy = jest.fn()

  beforeEach(() => {
    jest.useFakeTimers()
    wrapper = shallow(
      <MyGousto
        isMobileViewport={false}
        userLoadOrders={userLoadOrdersSpy}
        userGetReferralDetails={userGetReferralDetails}
      />,
      {
        context: {
          store: {
            dispatch: jest.fn(),
          },
        },
      }
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('componentDidMount', () => {
    test('should call userLoadOrders on mount', () => {
      expect(userLoadOrdersSpy).toHaveBeenCalled()
    })

    test('should pre-fetch menu data', () => {
      jest.advanceTimersByTime(500)
      expect(menuFetchData).toHaveBeenCalled()
    })
  })

  describe('rendering', () => {
    test('should render the cookbook', () => {
      expect(wrapper.find(Cookbook).length).toEqual(1)
    })

    test('should render the notification component', () => {
      expect(wrapper.find(Notification).length).toEqual(1)
    })

    test('should render the header component', () => {
      expect(wrapper.find(HeaderContainer).length).toEqual(1)
    })

    test('should render the refer a friend component', () => {
      expect(wrapper.find(ReferAFriend).length).toEqual(1)
    })

    test('the LimitedCapacityNotice is not rendered', () => {
      expect(wrapper.find('Connect(LimitedCapacityNotice)').exists()).toBe(false)
    })

    test('the AppAwarenessBanner is not rendered', () => {
      expect(wrapper.find('Connect(AppAwarenessBanner)').exists()).toBe(false)
    })

    describe('when limitedCapacity flag is true', () => {
      beforeEach(() => {
        wrapper = shallow(
          <MyGousto
            isMobileViewport={false}
            userLoadOrders={userLoadOrdersSpy}
            userGetReferralDetails={userGetReferralDetails}
            isCapacityLimited
          />,
          {
            context: {
              store: {
                dispatch: jest.fn(),
              },
            },
          }
        )
      })

      test('the LimitedCapacityNotice is rendered', () => {
        expect(wrapper.find('Connect(LimitedCapacityNotice)').exists()).toBe(true)
      })

      test('the AppAwarenessBanner is not rendered', () => {
        expect(wrapper.find('Connect(AppAwarenessBanner)').exists()).toBe(false)
      })
    })

    describe('when user is on desktop viewport', () => {
      beforeEach(() => {
        wrapper = shallow(
          <MyGousto
            userLoadOrders={userLoadOrdersSpy}
            userGetReferralDetails={userGetReferralDetails}
            isMobileViewport={false}
          />,
          {
            context: {
              store: {
                dispatch: jest.fn(),
              },
            },
          }
        )
      })

      test('the AppAwarenessBanner is not rendered', () => {
        expect(wrapper.find('Connect(AppAwarenessBanner)').exists()).toBe(false)
      })

      describe('and showAppAwareness flag is true', () => {
        beforeEach(() => {
          wrapper.setProps({ showAppAwareness: true })
        })

        test('the AppAwarenessBanner is rendered', () => {
          expect(wrapper.find('Connect(AppAwarenessBanner)').exists()).toBe(true)
        })
      })
    })

    describe('when isCustomNoticeEnabled feature flag is false', () => {
      beforeEach(() => {
        wrapper.setProps({ isCustomNoticeEnabled: false })
      })

      test('should not render a custom notice', () => {
        expect(wrapper.find('CustomNotice').exists()).toBe(false)
      })
    })

    describe('when isCustomNoticeEnabled feature flag is true', () => {
      beforeEach(() => {
        wrapper.setProps({ isCustomNoticeEnabled: true })
      })

      test('should render a custom notice', () => {
        expect(wrapper.find('CustomNotice').length).toBe(1)
      })
    })

    describe('when user has recipes to rate', () => {
      test('should render a Rate recipes link', () => {
        wrapper = shallow(
          <MyGousto
            rateRecipeCount={4}
            isMobileViewport={false}
            userLoadOrders={userLoadOrdersSpy}
            userGetReferralDetails={userGetReferralDetails}
            isCapacityLimited
          />,
          {
            context: {
              store: {
                dispatch: jest.fn(),
              },
            },
          }
        )
        expect(wrapper.find(Link).find({ to: '/rate-my-recipes' }).exists()).toBe(true)
      })

      test('should dispatch a tracking event for the mobile  button', () => {
        wrapper = shallow(
          <MyGousto
            trackClickRateRecipes={trackClickRateRecipesSpy}
            rateRecipeCount={3}
            isMobileViewport={false}
            userLoadOrders={userLoadOrdersSpy}
            userGetReferralDetails={userGetReferralDetails}
            isCapacityLimited
          />
        )
        const rateRecipeLink = wrapper
          .find(Link)
          .find({ to: '/rate-my-recipes' })
          .at(0)
          .simulate('click')
        rateRecipeLink.prop('tracking')()
        expect(trackClickRateRecipesSpy).toHaveBeenCalledWith('mygousto_button')
      })
      test('should dispatch a tracking event for the desktop button', () => {
        wrapper = shallow(
          <MyGousto
            trackClickRateRecipes={trackClickRateRecipesSpy}
            rateRecipeCount={3}
            isMobileViewport={false}
            userLoadOrders={userLoadOrdersSpy}
            userGetReferralDetails={userGetReferralDetails}
            isCapacityLimited
          />
        )
        const rateRecipeLink = wrapper
          .find(Link)
          .find({ to: '/rate-my-recipes' })
          .at(1)
          .simulate('click')
        rateRecipeLink.prop('tracking')()
        expect(trackClickRateRecipesSpy).toHaveBeenCalledWith('mygousto_button')
      })
    })

    describe('when user does not have recipes to rate', () => {
      test('should not render a Rate recipes button above the cookbook', () => {
        wrapper = shallow(
          <MyGousto
            rateRecipeCount={0}
            isMobileViewport={false}
            userLoadOrders={userLoadOrdersSpy}
            userGetReferralDetails={userGetReferralDetails}
            isCapacityLimited
          />,
          {
            context: {
              store: {
                dispatch: jest.fn(),
              },
            },
          }
        )
        expect(wrapper.find(Link).exists()).toBe(false)
      })
    })
  })
})
