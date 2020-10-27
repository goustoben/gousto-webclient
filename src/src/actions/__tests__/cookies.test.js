import { actionTypes } from 'actions/actionTypes'
import * as cookieHelper from 'utils/cookieHelper2'
import {
  cookiePolicyAcceptanceChange,
  trackCookiePolicyAccepted,
  trackCookiePolicyVisible,
} from '../cookies'

describe('cookie actions', () => {
  describe('cookiePolicyAcceptanceChange', () => {
    let dispatch

    beforeEach(() => {
      dispatch = jest.fn()
      cookieHelper.set = jest.fn()
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
      cookieHelper.set = jest.fn()
      cookiePolicyAcceptanceChange('isAcceptedValue')(dispatch)
      expect(cookieHelper.set).toHaveBeenCalled()
      expect(cookieHelper.set.mock.calls[0][1]).toEqual('cookie_policy_v2')
      expect(cookieHelper.set.mock.calls[0][2]).toEqual({ isAccepted: 'isAcceptedValue' })
    })

    test('cookie is set to the value passed to the action when not in client', () => {
      __CLIENT__ = false // eslint-disable-line no-global-assign
      cookieHelper.set = jest.fn()
      cookiePolicyAcceptanceChange(true)(dispatch)
      expect(cookieHelper.set).not.toHaveBeenCalled()
      __CLIENT__ = true // eslint-disable-line no-global-assign
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
