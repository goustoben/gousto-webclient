import { actionTypes } from 'actions/actionTypes'
import * as cookieHelper from 'utils/cookieHelper2'
import * as trackingKeys from 'actions/trackingKeys'
import { appBannerDismiss } from "actions/appBanner/appBannerDismiss"
import { trackingAppPromoCTAClick } from "actions/appBanner/appBanner/trackingAppPromoCTAClick"
import { trackingAppPromoBannerView } from "actions/appBanner/trackingAppPromoBannerView"

describe('app banner actions', () => {
  describe('appBannerDismiss', () => {
    let dispatch
    let cookieSetSpy

    beforeEach(() => {
      dispatch = jest.fn()
      cookieSetSpy = jest.spyOn(cookieHelper, 'set')
    })

    test('APP_BANNER_DISMISSED action type is dispatched', () => {
      appBannerDismiss()(dispatch)
      expect(dispatch.mock.calls[0][0].type).toEqual(actionTypes.APP_BANNER_DISMISSED)
    })

    test('cookie is set to true when in the client', () => {
      appBannerDismiss()(dispatch)

      expect(cookieSetSpy).toHaveBeenCalled()
      expect(cookieSetSpy).toBeCalledWith(expect.any(Function), 'app_banner_dismissed', true, 1)
    })
  })

  describe('trackingAppPromoCTAClick', () => {
    let dispatch

    beforeEach(() => {
      dispatch = jest.fn()
    })

    test('TRACKING action type is dispatched', () => {
      const platform = 'android'

      trackingAppPromoCTAClick({ platform })(dispatch)
      expect(dispatch.mock.calls[0][0]).toEqual(
        {
          type: actionTypes.TRACKING,
          trackingData: {
            actionType: trackingKeys.clickAppBannerInstall,
            platform,
          }
        }
      )
    })
  })

  describe('trackingAppPromoBannerView', () => {
    let dispatch

    beforeEach(() => {
      dispatch = jest.fn()
    })

    test('TRACKING action type is dispatched', () => {
      const platform = 'android'

      trackingAppPromoBannerView({ platform })(dispatch)
      expect(dispatch.mock.calls[0][0]).toEqual(
        {
          type: actionTypes.TRACKING,
          trackingData: {
            actionType: trackingKeys.viewAppBanner,
            platform,
          }
        }
      )
    })
  })
})
