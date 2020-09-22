import React from 'react'
import { shallow } from 'enzyme'
import { redirect } from 'utils/window'
import { AppBanner } from '../AppBanner'

jest.mock('utils/window')

describe('App Banner', () => {
  const mockAppBannerDismiss = jest.fn()
  const mockTrackingAppPromoCTAClick = jest.fn()
  const mockTrackingAppPromoBannerView = jest.fn()
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <AppBanner
        name="iOS"
        averageRating={3.6}
        ratings="33.6K"
        showAppBanner
        appBannerDismiss={mockAppBannerDismiss}
        trackingAppPromoCTAClick={mockTrackingAppPromoCTAClick}
        trackingAppPromoBannerView={mockTrackingAppPromoBannerView}
      />
    )
  })

  describe('when showAppBanner is true', () => {
    test('shows the banner and tracking is called', () => {
      expect(wrapper.find('.appBannerWrapper').length).toEqual(1)
      expect(mockTrackingAppPromoBannerView).toHaveBeenCalledWith({
        platform: 'iOS'
      })
    })

    test('should call appBannerDismiss callback when close button is clicked', () => {
      wrapper.find('.closeButton').simulate('click')
      expect(mockAppBannerDismiss).toHaveBeenCalled()
    })

    describe('and app install CTA is clicked', () => {
      beforeEach(() => {
        wrapper.find('.appLink').simulate('click')
      })

      test('then the tracking and redirect should be called', () => {
        expect(mockTrackingAppPromoCTAClick).toHaveBeenCalledWith({
          platform: 'iOS'
        })

        expect(redirect).toHaveBeenCalledWith('/apps')
      })
    })
  })

  describe('when showAppBanner is false', () => {
    beforeEach(() => {
      wrapper.setProps({ showAppBanner: false })
    })

    test('then the banner should not be shown', () => {
      expect(wrapper.find('.appBannerWrapper').length).toEqual(0)
    })
  })
})
