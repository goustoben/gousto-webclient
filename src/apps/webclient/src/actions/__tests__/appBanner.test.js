import { actionTypes } from 'actions/actionTypes'
import { appBannerDismiss, trackingAppPromoCTAClick, trackingAppPromoBannerView } from 'actions/appBanner'
import * as cookieHelper from 'utils/cookieHelper2'
import { canUseWindow } from 'utils/browserEnvironment'
import * as trackingKeys from 'actions/trackingKeys'

jest.mock('utils/browserEnvironment')

describe('app banner actions', () => {
  describe('appBannerDismiss', () => {
    let dispatch
    let cookieSetSpy

    beforeEach(() => {
      jest.clearAllMocks()

      canUseWindow.mockReturnValue(true)
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

    test('cookie is not set when not in the client', () => {
      canUseWindow.mockReturnValue(false)

      appBannerDismiss()(dispatch)

      expect(cookieSetSpy).not.toHaveBeenCalled()
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
