import { actionTypes } from 'actions/actionTypes'
import { appBannerDismiss, trackingAppPromoCTAClick, trackingAppPromoBannerView } from 'actions/appBanner'
import * as cookieHelper from 'utils/cookieHelper2'
import * as trackingKeys from 'actions/trackingKeys'

describe('app banner actions', () => {
  describe('appBannerDismiss', () => {
    let dispatch

    beforeEach(() => {
      dispatch = jest.fn()
      cookieHelper.set = jest.fn()
    })

    test('APP_BANNER_DISMISSED action type is dispatched', () => {
      appBannerDismiss()(dispatch)
      expect(dispatch.mock.calls[0][0].type).toEqual(actionTypes.APP_BANNER_DISMISSED)
    })

    test('cookie is set to true when in the client', () => {
      cookieHelper.set = jest.fn()
      appBannerDismiss()(dispatch)
      expect(cookieHelper.set).toHaveBeenCalled()
      expect(cookieHelper.set.mock.calls[0][1]).toEqual('app_banner_dismissed')
      expect(cookieHelper.set.mock.calls[0][2]).toEqual(true)
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
