import { actionTypes } from 'actions/actionTypes'
import * as cookieHelper from 'utils/cookieHelper2'
import { canUseWindow } from 'utils/browserEnvironment'
import {
  cookiePolicyAcceptanceChange,
  trackCookiePolicyAccepted,
  trackCookiePolicyVisible,
} from '../cookies'

jest.mock('utils/browserEnvironment')

describe('cookie actions', () => {
  describe('cookiePolicyAcceptanceChange', () => {
    let dispatch
    let cookieHelperSpy

    beforeEach(() => {
      dispatch = jest.fn()
      cookieHelperSpy = jest.spyOn(cookieHelper, 'set')
      canUseWindow.mockReturnValue(true)
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('COOKIE_POLICY_ACCEPTANCE_CHANGE action type is dispatched with value passed to the action', () => {
      cookiePolicyAcceptanceChange(true)(dispatch)
      expect(dispatch.mock.calls[0][0].type).toEqual(actionTypes.COOKIE_POLICY_ACCEPTANCE_CHANGE)
      expect(dispatch.mock.calls[0][0].isAccepted).toEqual(true)
      cookiePolicyAcceptanceChange(false)(dispatch)
      expect(dispatch.mock.calls[1][0].type).toEqual(actionTypes.COOKIE_POLICY_ACCEPTANCE_CHANGE)
      expect(dispatch.mock.calls[1][0].isAccepted).toEqual(false)
    })

    test('cookie is set to the value passed to the action when in client', () => {
      cookiePolicyAcceptanceChange('isAcceptedValue')(dispatch)

      expect(cookieHelperSpy).toHaveBeenCalled()
      expect(cookieHelperSpy.mock.calls[0][1]).toEqual('cookie_policy_v2')
      expect(cookieHelperSpy.mock.calls[0][2]).toEqual({ isAccepted: 'isAcceptedValue' })
    })

    test('cookie is set to the value passed to the action when not in client', () => {
      canUseWindow.mockReturnValue(false)

      cookiePolicyAcceptanceChange(true)(dispatch)

      expect(cookieHelperSpy).not.toHaveBeenCalled()
    })
  })

  describe('trackCookiePolicyAccepted', () => {
    test('creates the tracking action', () => {
      expect(trackCookiePolicyAccepted()).toEqual({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'cookie_banner_ok_clicked',
        }
      })
    })
  })

  describe('trackCookiePolicyVisible', () => {
    test('creates the tracking action', () => {
      expect(trackCookiePolicyVisible()).toEqual({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'cookie_banner_displayed',
        }
      })
    })
  })
})
