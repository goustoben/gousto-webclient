import Immutable from 'immutable'

import { loadRecommendations } from 'actions/recipes'

import fetchData from 'routes/Menu/fetchData'

jest.mock('actions')
jest.mock('utils/logger')

jest.mock('actions/recipes', () => ({
	loadRecommendations: jest.fn()
}))

describe('fetchData', () => {
	const getState = jest.fn()
	const dispatch = jest.fn()
	const fetchDataParams = {
		store: {
			getState,
			dispatch,
		},
		query: {},
		params: {},
	}

	const createState = ({
		auth = Immutable.Map({}),
		features = Immutable.Map({}),
	} = {}) => ({
		auth,
		basket: Immutable.Map({}),
		features,
		menuRecipeStock: Immutable.Map({}),
		pending: Immutable.Map({}),
		request: Immutable.Map({}),
		user: Immutable.Map({}),
	})

	afterEach(() => {
		dispatch.mockClear()
		getState.mockClear()
		loadRecommendations.mockClear()
	})

	describe('loading recommendations', () => {
		beforeEach(() => {
			dispatch.mockReturnValue(Promise.resolve())
		})

		describe('when not authenticated ', () => {
			test('should not dispatch a loadRecommendations request', () => {
				getState.mockReturnValue(createState())

				fetchData(fetchDataParams)

				expect(loadRecommendations).not.toHaveBeenCalled()
			})
		})

		describe('when a just for you feature is found', () => {
			test('should not dispatch a loadRecommendations request', () => {
				getState.mockReturnValue(createState({
					features: Immutable.Map({
						justforyou: Immutable.Map({
							value: true,
							experiment: true,
						}),
					}),
				}))

				fetchData(fetchDataParams)

				expect(loadRecommendations).not.toHaveBeenCalled()
			})
		})

		describe('when authenticated and no just for you feature is found', () => {
			test('should dispatch a loadRecommendations request', () => {
				getState.mockReturnValue(createState({
					auth: Immutable.Map({
						isAuthenticated: true,
					}),
				}))

				fetchData(fetchDataParams)

				expect(loadRecommendations).toHaveBeenCalled()
			})
		})
	})
})
