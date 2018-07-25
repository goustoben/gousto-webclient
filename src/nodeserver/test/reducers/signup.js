import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import signupReducers from 'reducers/signup'

describe('signupSteps reducer', function() {
	let signup
	beforeEach(function() {
		signup = require('inject-loader!reducers/signup')({
			'config/signup': {
				defaultSteps: ['a', 'b', 'c'],
			},
		}).default
	})

	it('should handle initial state', function() {
		const result = signup.signup(undefined, {})
		const expected = Immutable.fromJS({
			wizard: {
				steps: Immutable.List(),
				currentStepName: false,
				currentStepNumber: 0,
				isLastStep: false,
			}
		})

		expect(Immutable.is(result, expected)).to.equal(true)
	})

	it('should handle unknown actions', function() {
		const state = Immutable.fromJS({
			wizard: {
				steps: Immutable.List(),
				currentStepName: false,
				currentStepNumber: 0,
				isLastStep: false,
			}
		})
		const result = signup.signup(state, { type: 'unknown' })

		expect(result).to.equal(state)
	})

	it('should handle SIGNUP_STEPS_RECEIVE action types', function() {
		const result = signup.signup(undefined, {
			type: actionTypes.SIGNUP_STEPS_RECEIVE,
			steps: ['d', 'e', 'f'],
		})
		const expected = Immutable.fromJS({
			wizard: {
				steps: Immutable.List(['d', 'e', 'f']),
				currentStepName: false,
				currentStepNumber: 0,
				isLastStep: false,
			}
		})

		expect(Immutable.is(result, expected)).to.equal(true)
	})
})

describe('signupCookForKids reducer', function() {
	it('should handle initial state', function() {
		const result = signupReducers.signupCookForKids(undefined, {})

		expect(result).to.equal(false)
	})

	it('should handle unknown actions', function() {
		const state = true
		const result = signupReducers.signupCookForKids(state, { type: 'unknown' })

		expect(result).to.equal(true)
	})

	it('should handle SIGNUP_COOK_FOR_KIDS action types', function() {
		const result = signupReducers.signupCookForKids(undefined, {
			type: actionTypes.SIGNUP_COOK_FOR_KIDS,
			cookForKids: true,
		})

		expect(result).to.equal(true)

		const nextResult = signupReducers.signupCookForKids(true, {
			type: actionTypes.SIGNUP_COOK_FOR_KIDS,
			cookForKids: 'something',
		})

		expect(nextResult).to.equal('something')
	})
})
