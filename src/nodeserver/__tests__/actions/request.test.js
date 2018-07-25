import sinon from 'sinon'

import actionTypes from 'actions/actionTypes'
import { browserTypeChange, setUserAgent } from 'actions/request'

describe('request actions', () => {
	describe('setUserAgent', () => {
		expect(setUserAgent('facebot')).toEqual({
			type: actionTypes.BROWSER_SET_USER_AGENT,
			userAgent: 'facebot',
		})
	})

	describe('browserTypeChange', () => {
		test('should dispatch an action with BROWSER_TYPE_CHANGE action type and value', () => {
			expect(browserTypeChange('desktop')).toEqual({
				type: actionTypes.BROWSER_TYPE_CHANGE,
				browserType: 'desktop',
			})
		})
	})
})
