import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import signup from 'actions/signup'
import basketActions from 'actions/basket'
import signupActions from 'actions/signup'
import actionTypes from 'actions/actionTypes'
import { configureStore } from 'store'
import Immutable from 'immutable'
const rrrouter = require('react-router-redux')

describe('signupStepsReceive action', function() {
	it('should return a SIGNUP_STEPS_RECEIVE action', function () {
		expect(signup.signupStepsReceive('a').type).to.equal(actionTypes.SIGNUP_STEPS_RECEIVE)
	})
	it('should return a SIGNUP_STEPS_RECEIVE action with the steps argument mapped through to the steps property', function () {
		expect(signup.signupStepsReceive('a').steps).to.equal('a')
	})
})

describe('signupChangePostcode action', async () => {

	let sandbox
	let basketPostcodeStub
	let dispatchSpy
	let postcode
	let nextStepName
	beforeEach(function () {
		postcode = 'w37un'
		nextStepName = 'delivery'
		sandbox = sinon.sandbox.create()
		dispatchSpy = sandbox.spy()
		basketPostcodeStub = sandbox.stub(basketActions, 'basketPostcodeChange')
	})

	afterEach(function() {
		sandbox.restore()
		sinon.restore()
	})

	it('dispatch signup Change postocde', async () => {
		const signupNextStep = sandbox.stub(signupActions, 'signupNextStep').returns(() => ({}))

		const getStateSpy = sandbox.stub().returns({
			signup: Immutable.fromJS({
				wizard: {
					steps: ['welcome', 'then', 'something'],
				}
			}),
			error: Immutable.Map({
				[actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE]: false,
			}),
		})
		await signupActions.signupChangePostcode(postcode, nextStepName)(dispatchSpy, getStateSpy)

		expect(signupNextStep).to.have.been.calledWith(nextStepName)
	})

	describe('with a boxSummaryDeliveryDaysErr', function() {
		it('should not redirect the user to the next step', async function() {
			const getStateSpy = sinon.stub().returns({
				error: Immutable.Map({
					[actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE]: 'do-not-deliver',
				}),
			})
			const pushSpy = sinon.stub(rrrouter, 'push').returns(() => ({}))
			await signupActions.signupChangePostcode(postcode, nextStepName)(dispatchSpy, getStateSpy)
			expect(pushSpy).not.to.have.been.called
		})
	})
})

describe('signupSetStep action', function(){
	let pushSpy
	let getStateSpy
	let dispatchSpy
	let sandbox
	let signupProxyActions
	beforeEach(function() {
		sandbox = sinon.sandbox.create()
		pushSpy = sinon.stub(rrrouter, 'push').withArgs('').returns(() => ({}))
		getStateSpy = sandbox.stub().returns({
			signup: Immutable.fromJS({
				wizard: {
					steps: [['delivery', 'welcome', 'finish']],
				},
			}),
			error: Immutable.Map({
				[actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE]: false,
			}),
		})

		dispatchSpy = sandbox.stub()
		signupProxyActions = require('inject-loader!actions/signup')({
			'react-router-redux': {
				push: pushSpy,
			},
			'config/routes': { client: { signup: '/signup' } },
		}).default
	})

	afterEach(() => {
		sandbox.restore()
		sinon.restore()
	})

	it('should dispatch a react-router-redux push', function(){
		signupProxyActions.signupNextStep('welcome')(dispatchSpy, getStateSpy)
		expect(pushSpy).to.have.been.calledWith('/signup/welcome')
	})
	it('should dispatch a tracking event with the correct properties', function(){
		signupActions.signupNextStep('welcome')(dispatchSpy, getStateSpy)
		expect(dispatchSpy).to.have.been.calledTwice
	})
})

describe('signupCookForKidsChange action', function() {
	let sandbox
	let dispatch
	let getState
	let basketNumPeopleChange
	let signupStepsReceive

	beforeEach(function() {
		sandbox = sinon.sandbox.create()
		dispatch = sandbox.spy()
		getState = sandbox.stub().returns({
			signupSteps: Immutable.fromJS(['kidsCookFor']),
		})
		basketNumPeopleChange = sandbox.spy(basketActions, 'basketNumPeopleChange')
		signupStepsReceive = sandbox.spy(signup, 'signupStepsReceive')
	})

	afterEach(function() {
		sandbox.restore()
	})

	it('should dispatch SIGNUP_COOK_FOR_KIDS action as first call', function() {
		signup.signupCookForKidsChange(true)(dispatch, getState)
		expect(dispatch.firstCall).to.have.been.calledWithExactly({
			type: actionTypes.SIGNUP_COOK_FOR_KIDS,
			cookForKids: true,
			trackingData: {
				type: actionTypes.SIGNUP_COOK_FOR_KIDS,
				cookForKids: true,
			}
		})

		dispatch.reset()
		signup.signupCookForKidsChange(false)(dispatch, getState)
		expect(dispatch.firstCall).to.have.been.calledWithExactly({
			type: actionTypes.SIGNUP_COOK_FOR_KIDS,
			cookForKids: false,
			trackingData: {
				type: actionTypes.SIGNUP_COOK_FOR_KIDS,
				cookForKids: false,
			}
		})
	})
})

describe('signupTracking action', function() {
	let sandbox
	let dispatch
	let getState

	beforeEach(function() {
		sandbox = sinon.sandbox.create()
		dispatch = sandbox.spy()
		getState = sandbox.stub().returns({
			basket: Immutable.fromJS({
				postcode: 'w128nu',
				numAdults: 2,
				numPortions: 4,
				date: '2017-06-09',
				slotId: '95355fb4-01db-4169-abe2-04695ec451bc',
			}),
		})
	})

	it('should send tracking data', function() {
		signup.signupTracking()(dispatch, getState)
		expect(dispatch).to.have.been.calledOnce
		expect(dispatch.args[0][0]).to.deep.equal({
			type: "SIGNUP_TRACKING",
			trackingData: {
				actionType: "SIGNUP_TRACKING",
				postcode: 'w128nu',
				numAdults: 2,
				numPortions: 4,
				date: '2017-06-09',
				slotId: '95355fb4-01db-4169-abe2-04695ec451bc',
			},
		})
	})
})
