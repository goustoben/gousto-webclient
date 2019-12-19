import actionTypes from 'actions/actionTypes'
import { appBannerDismiss } from 'actions/appBanner'
import * as cookieHelper from 'utils/cookieHelper2'

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
})
