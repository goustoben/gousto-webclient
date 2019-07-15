import actionTypes from 'actions/actionTypes'
import { appBannerActions } from 'actions/appBanner'
import * as cookieHelper from 'utils/cookieHelper2'

describe('app banner actions', () => {
  describe('appBannerDismiss', () => {
    let dispatch

    beforeEach(() => {
      dispatch = jest.fn()
      cookieHelper.set = jest.fn()
    })

    test('APP_BANNER_DISMISSED action type is dispatched', () => {
      appBannerActions.appBannerDismiss()(dispatch)
      expect(dispatch.mock.calls[0][0].type).toEqual(actionTypes.APP_BANNER_DISMISSED)
    })

    test('cookie is set to true when in the client', () => {
      cookieHelper.set = jest.fn()
      appBannerActions.appBannerDismiss()(dispatch)
      expect(cookieHelper.set).toHaveBeenCalled()
      expect(cookieHelper.set.mock.calls[0][1]).toEqual('app_banner_dismissed')
      expect(cookieHelper.set.mock.calls[0][2]).toEqual(true)
    })

    test('cookie is set to the value passed to the action when not in client', () => {
      __CLIENT__ = false
      cookieHelper.set = jest.fn()
      appBannerActions.appBannerDismiss(true)(dispatch)
      expect(cookieHelper.set).not.toHaveBeenCalled()
      __CLIENT__ = true
    })
  })
})
