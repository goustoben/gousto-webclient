import sinon from 'sinon'

import Immutable from 'immutable' /* eslint-disable new-cap */
import features from 'actions/features'
import actionTypes from 'actions/actionTypes'

describe('features actions', () => {
	describe('featureSet', () => {
		let dispatch
		let getState

		beforeEach(() => {
			dispatch = sinon.spy()
			getState = sinon.stub().returns({
				auth: Immutable.fromJS({
					isAuthenticated: true,
				}),
			})
		})

		test('should dispatch a FEATURE_SET action', () => {
			features.featureSet('a', 'b')(dispatch, getState)
			expect(dispatch.firstCall.args[0].type).toEqual(actionTypes.FEATURE_SET)
		})
		test('should return a FEATURE_SET action with the first argument mapped through to the `feature` property and the second to the value property', () => {
			features.featureSet('a', 'b')(dispatch, getState)
			expect(dispatch.firstCall.args[0].feature).toEqual('a')
			expect(dispatch.firstCall.args[0].value).toEqual('b')
		})
		test('should convert the string "true" to the boolean value', () => {
			features.featureSet('a', 'true')(dispatch, getState)
			expect(dispatch.firstCall.args[0].value).toEqual(true)
		})
		test('should convert the string "false" to the boolean value', () => {
			features.featureSet('a', 'false')(dispatch, getState)
			expect(dispatch.firstCall.args[0].value).toEqual(false)
		})
		test('should return experiment set to false by default', () => {
			features.featureSet('a', 'false')(dispatch, getState)
			expect(dispatch.firstCall.args[0].experiment).toEqual(false)
		})
		test('should return experiment set to passed in value if provided', () => {
			features.featureSet('a', 'false', true)(dispatch, getState)
			expect(dispatch.firstCall.args[0].experiment).toEqual(true)
		})
		test('should return isAuthenticated from auth state', () => {
			features.featureSet('a', 'false')(dispatch, getState)
			expect(dispatch.firstCall.args[0].isAuthenticated).toEqual(true)

			dispatch.reset()
			getState.returns({
				auth: Immutable.fromJS({
					isAuthenticated: false,
				}),
			})
			features.featureSet('a', 'false')(dispatch, getState)
			expect(dispatch.firstCall.args[0].isAuthenticated).toEqual(false)
		})
	})
})
