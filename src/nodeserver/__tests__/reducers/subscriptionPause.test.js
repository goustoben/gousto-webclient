import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-caps */
import subReducer, {
	subscriptionPauseInitialState,
} from 'reducers/subscriptionPause'

describe('Subscription reducer', () => {
	let state

	beforeEach(() => {
		state = subscriptionPauseInitialState
	})

	describe('SUBSCRIPTION_PAUSE_VISIBILITY_CHANGE', () => {
		test('should set inProgress value', () => {
			const result = subReducer.subscriptionPause(state, {
				type: actionTypes.SUBSCRIPTION_PAUSE_VISIBILITY_CHANGE,
				visible: true,
			})

			expect(result.get('inProgress')).toBe(true)
		})
	})

	describe('SUBSCRIPTION_PAUSE_REASONS_RECEIVE', () => {
		test('should subscriptionPauseReasons value', () => {
			const reasons = [
				{
					id: 'id',
					slug: 'slug',
					label: 'label',
					initial: null,
					children: 'children',
				},
			]
			const metaData = { meta: 'data' }
			const result = subReducer.subscriptionPause(state, {
				type: actionTypes.SUBSCRIPTION_PAUSE_REASONS_RECEIVE,
				reasons,
				metaData,
			})

			expect(
				Immutable.is(result.get('reasons'), Immutable.fromJS(reasons)),
			).toBe(true)
			expect(
				Immutable.is(result.get('metaData'), Immutable.fromJS(metaData)),
			).toBe(true)
			expect(result.get('startScreen').size).toBe(0)
		})
		test('should subscriptionPauseReasons value with initial reason', () => {
			const reasons = [
				{
					id: 'id1',
					slug: 'slug',
					label: 'label',
					initial: null,
					children: 'children',
				},
				{
					id: 'id2',
					slug: 'slug',
					label: 'label',
					initial: true,
					children: 'children',
					steps: [
						{
							id: 'testid',
							test: 'test1',
						},
					],
				},
			]
			const result = subReducer.subscriptionPause(state, {
				type: actionTypes.SUBSCRIPTION_PAUSE_REASONS_RECEIVE,
				reasons,
			})

			expect(
				Immutable.is(
					result.get('reasons'),
					Immutable.fromJS([
						{
							id: 'id1',
							slug: 'slug',
							label: 'label',
							initial: null,
							children: 'children',
						},
					]),
				),
			).toBe(true)
			expect(
				Immutable.is(
					result.get('startScreen'),
					Immutable.fromJS([
						{
							id: 'id2',
							slug: 'slug',
							label: 'label',
							initial: true,
							children: 'children',
							steps: [
								{
									id: 'testid',
									test: 'test1',
								},
							],
						},
					]),
				),
			).toBe(true)
		})
	})

	describe('SUBSCRIPTION_PAUSE_REASON_LOAD_REASONS', () => {
		test('should set activeReasons value given pause reasons', () => {
			const reasons = [{ id: '1' }, { id: '2' }, { id: '3' }]

			const result = subReducer.subscriptionPause(state, {
				type: actionTypes.SUBSCRIPTION_PAUSE_REASON_LOAD_REASONS,
				reasons,
			})

			const activeReasons = {
				1: { id: '1' },
				2: { id: '2' },
				3: { id: '3' },
			}

			expect(result.get('activeReasons').toJS()).toEqual(activeReasons)
			expect(Immutable.is(result.get('activeSteps'), Immutable.Map({}))).toBe(
				true,
			)
			expect(result.get('activeStepId')).toBe(undefined)
		})
	})

	describe('SUBSCRIPTION_PAUSE_REASON_CHOICE', () => {
		test('should set chosenReasonIds', () => {
			const result = subReducer.subscriptionPause(state, {
				type: actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE,
				chosenReasonIds: Immutable.List(['123']),
			})

			expect(
				Immutable.is(result.get('chosenReasonIds'), Immutable.List(['123'])),
			).toBe(true)
		})

		test('should set activeSteps value to OrderedMap of keyed steps given activeReasons in current state', () => {
			state = Immutable.fromJS({
				activeReasons: {
					123: Immutable.fromJS({
						steps: [{ id: '1' }, { id: '2' }, { id: '3' }],
					}),
				},
				activeSteps: {},
				activeStepId: undefined,
				chosenReasonIds: [],
				inProgress: false,
				reasons: [],
			})

			const result = subReducer.subscriptionPause(state, {
				type: actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE,
				chosenReasonIds: Immutable.List(['123']),
			})

			expect(result.get('activeSteps').toJS()).toEqual({
				1: { id: '1' },
				2: { id: '2' },
				3: { id: '3' },
			})
		})

		test('should handle setting activeSteps value to when no activeReasons in current state', () => {
			state = Immutable.fromJS({
				activeReasons: undefined,
				activeSteps: {},
				activeStepId: undefined,
				chosenReasonIds: [],
				inProgress: false,
				reasons: [],
			})

			const result = subReducer.subscriptionPause(state, {
				type: actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE,
				chosenReasonIds: Immutable.List(['123']),
			})

			expect(result.get('activeSteps').toJS()).toEqual({})
		})

		test('should reset activeStepId', () => {
			state = Immutable.fromJS({
				activeReasons: {},
				activeSteps: {},
				activeStepId: 's1',
				chosenReasonIds: [],
				inProgress: false,
				reasons: [],
			})

			const result = subReducer.subscriptionPause(state, {
				type: actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE,
				chosenReasonIds: Immutable.List(['123']),
			})

			expect(result.get('activeStepId')).toBe(
				subscriptionPauseInitialState.get('activeStepId'),
			)
		})

		test('should reset staticScreenId', () => {
			state = Immutable.fromJS({
				activeReasons: {},
				activeSteps: {},
				activeStepId: 's1',
				chosenReasonIds: [],
				inProgress: false,
				reasons: [],
				staticScreenId: 'error',
			})

			const result = subReducer.subscriptionPause(state, {
				type: actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE,
				chosenReasonIds: Immutable.List(['123']),
			})

			expect(result.get('staticScreenId')).toBe(
				subscriptionPauseInitialState.get('staticScreenId'),
			)
		})
	})

	describe('SUBSCRIPTION_PAUSE_REASON_LOAD_STATIC_SCREEN', () => {
		test('should set staticScreenId value given screen type', () => {
			const result = subReducer.subscriptionPause(state, {
				type: actionTypes.SUBSCRIPTION_PAUSE_REASON_LOAD_STATIC_SCREEN,
				screenType: 'testType',
			})

			expect(result.get('staticScreenId')).toBe('testType')
		})
	})

	describe('SUBSCRIPTION_PAUSE_REASON_LOAD_STEP', () => {
		test('should set activeStepId', () => {
			const result = subReducer.subscriptionPause(state, {
				type: actionTypes.SUBSCRIPTION_PAUSE_REASON_LOAD_STEP,
				activeStepId: '456',
			})

			expect(result.get('activeStepId')).toBe('456')
		})

		test('should reset staticScreenId', () => {
			state = Immutable.fromJS({
				activeReasons: {},
				activeSteps: {},
				activeStepId: 's1',
				chosenReasonId: undefined,
				inProgress: false,
				reasons: [],
				staticScreenId: 'error',
			})

			const result = subReducer.subscriptionPause(state, {
				type: actionTypes.SUBSCRIPTION_PAUSE_REASON_LOAD_STEP,
				activeStepId: '456',
			})

			expect(result.get('staticScreenId')).toBe(
				subscriptionPauseInitialState.get('staticScreenId'),
			)
		})
	})

	describe('SUBSCRIPTION_PAUSE_REASON_RESET', () => {
		let result
		state = Immutable.fromJS({
			activeReasons: undefined,
			activeSteps: undefined,
			activeStepId: undefined,
			chosenReasonId: 'xyz',
			staticScreenId: 'abc',
		})

		beforeEach(() => {
			result = subReducer.subscriptionPause(state, {
				type: actionTypes.SUBSCRIPTION_PAUSE_REASON_RESET,
			})
		})

		test('should reset activeReasons value', () => {
			expect(result.get('activeReasons')).toBe(
				subscriptionPauseInitialState.get('activeReasons'),
			)
		})

		test('should reset activeSteps value', () => {
			expect(result.get('activeSteps')).toBe(
				subscriptionPauseInitialState.get('activeSteps'),
			)
		})

		test('should reset activeStepId value', () => {
			expect(result.get('activeStepId')).toBe(
				subscriptionPauseInitialState.get('activeStepId'),
			)
		})

		test('should reset chosenReasonIds value', () => {
			expect(result.get('chosenReasonIds')).toBe(
				subscriptionPauseInitialState.get('chosenReasonIds'),
			)
		})

		test('should reset staticScreenId value', () => {
			expect(result.get('staticScreenId')).toBe(
				subscriptionPauseInitialState.get('staticScreenId'),
			)
		})
	})

	describe('SUBSCRIPTION_PAUSE_REASONS_REFRESH_REQUIRED', () => {
		test('should set refreshRequired', () => {
			let result = subReducer.subscriptionPause(state, {
				type: actionTypes.SUBSCRIPTION_PAUSE_REASONS_REFRESH_REQUIRED,
				refreshRequired: true,
			})

			expect(result.get('refreshRequired')).toBe(true)

			result = subReducer.subscriptionPause(state, {
				type: actionTypes.SUBSCRIPTION_PAUSE_REASONS_REFRESH_REQUIRED,
				refreshRequired: false,
			})

			expect(result.get('refreshRequired')).toBe(false)
		})
	})
})
