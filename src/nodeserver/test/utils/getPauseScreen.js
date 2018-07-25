import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import Immutable from 'immutable' /* eslint-disable new-cap */

import getPauseScreen from 'utils/getPauseScreen'

describe('getPauseScreen', function() {
	it('should throw error if subscriptionPauseState data is invalid/not Immutable', function() {
		expect(getPauseScreen).to.throw('getPauseScreen error: invalid subscriptionPause state')
	})

	describe('when staticScreenId is found in state', function() {
		let subscriptionPauseState
		let getPauseScreenFromConfig
		let getPauseScreenInjected
		let getPauseScreenContentMapped

		beforeEach(function() {
			getPauseScreenFromConfig = sinon.stub().returns(Immutable.fromJS({
				actions: ['Cancel', 'GoToMenu'],
				content: [
					{
						type: 'copy',
						defaults: {
							message: 'Default Message',
						},
					},
				],
				title: 'Default Title',
				type: 'recovered',
			}))

			getPauseScreenContentMapped = sinon.stub().returns(Immutable.fromJS([{ message: 'Default Message' }]))

			subscriptionPauseState = Immutable.fromJS({
				staticScreenId: 'recovered',
			})

			getPauseScreenInjected = require('inject-loader?utils/getPauseScreenFromConfig&utils/getPauseScreenContentMapped!utils/getPauseScreen')({
				'utils/getPauseScreenFromConfig': getPauseScreenFromConfig,
				'utils/getPauseScreenContentMapped': getPauseScreenContentMapped,
			}).default
		})

		it('should return Immutable Map with screen defaults for type set in staticScreenId, excluding "content"', function() {
			const result = getPauseScreenInjected(subscriptionPauseState)
			expect(result.get('type')).to.equal('recovered')
			expect(result.get('actions').toJS()).to.deep.equal(['Cancel', 'GoToMenu'])
			expect(Immutable.is(result.get('content'), Immutable.fromJS([{
				message: 'Default Message',
			}]))).to.equal(true)
		})
	})

	describe('when activeStepId is found in state', function() {
		let subscriptionPauseState
		let getPauseScreenFromConfig
		let getPauseScreenInjected

		beforeEach(function() {
			getPauseScreenFromConfig = sinon.stub().returns(Immutable.fromJS({
				actions: ['Cancel', 'GoToMenu'],
				title: 'Default Title',
			}))

			subscriptionPauseState = Immutable.fromJS({
				activeReasons: {},
				activeSteps: {
					s1: {
						type: 'anyType',
						content: {
							message: 'Sample mesaage from state 1',
						},
					},
					s2: {
						type: 'anyType',
						content: {
							title: 'Sample Title From State 2',
							message: 'Sample mesaage from state 2',
						},
					},
				},
				activeStepId: 's2',
				chosenReasonId: undefined,
				inProgress: false,
				reasons: [],
			})

			getPauseScreenInjected = require('inject-loader?utils/getPauseScreenFromConfig!utils/getPauseScreen')({
				'utils/getPauseScreenFromConfig': getPauseScreenFromConfig,
			}).default
		})

		it('should throw error if "content" is not set in active step', function() {
			subscriptionPauseState = Immutable.fromJS({
				activeReasons: {},
				activeSteps: {
					s1: {
						type: 'anyType',
					},
				},
				activeStepId: 's1',
				chosenReasonId: undefined,
				inProgress: false,
				reasons: [],
			})

			expect(() => getPauseScreen(subscriptionPauseState)).to.throw('getPauseScreen error: invalid content in step s1')
		})

		it('should return Immutable Map with screen defaults for given type merged with details from state, excluding "content"', function() {
			const result = getPauseScreenInjected(subscriptionPauseState)
			expect(result.get('type')).to.equal('anyType')
			expect(result.get('actions').toJS()).to.deep.equal(['Cancel', 'GoToMenu'])
			expect(Immutable.is(result.get('content'), Immutable.List([]))).to.be.true
		})

		it('should set title to title from state "content"', function() {
			const result = getPauseScreenInjected(subscriptionPauseState)

			expect(result.get('title')).to.equal('Sample Title From State 2')
		})

		it('should set title to default title if not available in state "content"', function() {
			subscriptionPauseState = Immutable.fromJS({
				activeReasons: {},
				activeSteps: {
					s1: {
						type: 'anyType',
						content: {
							message: 'Sample mesaage from state 1',
						},
					},
					s2: {
						type: 'anyType',
						content: {
							title: 'Sample Title From State 2',
							message: 'Sample mesaage from state 2',
						},
					},
				},
				activeStepId: 's1',
				chosenReasonId: undefined,
				inProgress: false,
				reasons: [],
			})

			const result = getPauseScreenInjected(subscriptionPauseState)

			expect(result.get('title')).to.equal('Default Title')
		})
	})

	describe('when activeStepId is not found in state & activeReasons are found', function() {
		let getPauseScreenFromConfig
		let getPauseScreenInjected
		let subscriptionPauseState

		beforeEach(function() {
			getPauseScreenFromConfig = sinon.stub().returns(Immutable.fromJS({
				actions: ['Cancel', 'GoToMenu'],
				title: 'Default Title',
			}))

			getPauseScreenInjected = require('inject-loader?utils/getPauseScreenFromConfig!utils/getPauseScreen')({
				'utils/getPauseScreenFromConfig': getPauseScreenFromConfig,
			}).default
		})

		it('should return config for "reasonGrid" if any reason has children', function() {
			subscriptionPauseState = Immutable.fromJS({
				activeReasons: {
					1: {
						id: 'r1',
					},
					2: {
						id: 'r2',
						children: [
							{ id: 'sr1' },
						],
					},
				},
				activeSteps: {},
				activeStepId: undefined,
				chosenReasonId: undefined,
				inProgress: false,
				reasons: [],
			})

			getPauseScreenInjected(subscriptionPauseState)

			expect(getPauseScreenFromConfig.getCall(0).args[0]).to.equal('reasonGrid')
		})

		it('should return config for "reasonList" if no reason has children', function() {
			subscriptionPauseState = Immutable.fromJS({
				activeReasons: {
					1: { id: 'r1' },
					2: { id: 'r2' },
				},
				activeSteps: {},
				activeStepId: undefined,
				chosenReasonId: undefined,
				inProgress: false,
				reasons: [],
			})

			getPauseScreenInjected(subscriptionPauseState)

			expect(getPauseScreenFromConfig.getCall(0).args[0]).to.equal('reasonList')
		})
	})

	describe('when activeStepId is not found in state & activeReasons are not found in state', function() {
		it('should return an empty Immutable Map', function() {
			const state = Immutable.fromJS({
				activeReasons: {},
				activeSteps: {},
				activeStepId: undefined,
				chosenReasonId: undefined,
				inProgress: false,
				reasons: [],
			})

			expect(Immutable.is(getPauseScreen(state), Immutable.Map({}))).to.equal(true)
		})
	})
})
