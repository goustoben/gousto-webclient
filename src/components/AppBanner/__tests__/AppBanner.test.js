import React from 'react'
import { shallow } from 'enzyme'
import { AppBanner } from '../AppBanner'

describe('App Banner', () => {
  const mockAppBannerDismiss = jest.fn()
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<AppBanner name='iOS' averageRating={3.6} ratings='33.6K' showAppBanner appBannerDismiss={mockAppBannerDismiss} />)
  })

  describe('when showAppBanner is true', () => {
    test('shows the banner', () => {
      expect(wrapper.find('.appBannerWrapper').length).toEqual(1)
    })
    test('displays correct number of stars, to the nearest half, according to rating', () => {
      expect(wrapper.find('.starFull').length).toEqual(3)
      expect(wrapper.find('.starHalf').length).toEqual(1)
      expect(wrapper.find('.starEmpty').length).toEqual(1)
    })
    test('should call appBannerDismiss callback when close button is clicked', () => {
      wrapper.find('.closeButton').simulate('click')
      expect(mockAppBannerDismiss).toHaveBeenCalled()
    })
  })

})
