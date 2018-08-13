import actionTypes from 'actions/actionTypes'
import cookieActions from 'actions/cookies'
import * as cookieHelper from 'utils/cookieHelper2'

describe('cookie actions', () => {
	describe('cookiePolicyAcceptanceChange', () => {
		let dispatch

		beforeEach(() => {
			dispatch = jest.fn()
			cookieHelper.set = jest.fn()
		})

		test('COOKIE_POLICY_ACCEPTANCE_CHANGE action type is dispatched with value passed to the action', () => {
			cookieActions.cookiePolicyAcceptanceChange(true)(dispatch)
			expect(dispatch.mock.calls[0][0].type).toEqual(actionTypes.COOKIE_POLICY_ACCEPTANCE_CHANGE)
			expect(dispatch.mock.calls[0][0].isAccepted).toEqual(true)
			cookieActions.cookiePolicyAcceptanceChange(false)(dispatch)
			expect(dispatch.mock.calls[1][0].type).toEqual(actionTypes.COOKIE_POLICY_ACCEPTANCE_CHANGE)
			expect(dispatch.mock.calls[1][0].isAccepted).toEqual(false)
		})

		test('cookie is set to the value passed to the action when in client', () => {
			cookieHelper.set = jest.fn()
			cookieActions.cookiePolicyAcceptanceChange('isAcceptedValue')(dispatch)
			expect(cookieHelper.set).toHaveBeenCalled()
			expect(cookieHelper.set.mock.calls[0][1]).toEqual('cookie_policy')
			expect(cookieHelper.set.mock.calls[0][2]).toEqual({ isAccepted: 'isAcceptedValue' })
		})

		test('cookie is set to the value passed to the action when not in client', () => {
			__CLIENT__ = false
			cookieHelper.set = jest.fn()
			cookieActions.cookiePolicyAcceptanceChange(true)(dispatch)
			expect(cookieHelper.set).not.toHaveBeenCalled()
			__CLIENT__ = true
		})
	})
})
