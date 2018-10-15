import Immutable from 'immutable'

import logger from 'utils/logger'
import { featureSet } from 'actions/features'
import { fetchRecommendations } from 'apis/recipes'

jest.mock('utils/logger')
jest.mock('apis/recipes')
jest.mock('actions/features', () => ({
	featureSet: jest.fn(),
}))

import { loadRecommendations } from 'actions/recipes'

describe('recipe actions', () => {
	const dispatch = jest.fn()
	const getState = jest.fn()

	afterEach(() => {
		dispatch.mockClear()
		getState.mockClear()
		featureSet.mockClear()
	})

	describe('loadRecommendations', () => {
		test('should dispatch a fetch request containing the accessToken', async () => {
			getState.mockReturnValue({
				auth: Immutable.Map({
					accessToken: 'testToken1334',
				}),
			})

			await loadRecommendations()(dispatch, getState)

			expect(fetchRecommendations).toHaveBeenCalledWith('testToken1334')
		})

		describe('when the api responds with no recommendations', () => {
			test('should not dispatch a user recommendations available request', async () => {
				fetchRecommendations.mockReturnValue(Promise.resolve({
					data: {}
				}))

				await loadRecommendations()(dispatch, getState)

				expect(dispatch).not.toHaveBeenCalled()
			})
		})

		describe('when the api responds with recommendations turned off', () => {
			test('should not dispatch a user recommendations available request', async () => {
				fetchRecommendations.mockReturnValue(Promise.resolve({
					data: {
						properties: { 'just-for-you': false },
					}
				}))

				await loadRecommendations()(dispatch, getState)

				expect(featureSet).not.toHaveBeenCalled()
				expect(dispatch).not.toHaveBeenCalled()
			})
		})

		describe('when the api responds with recommendations turned on', () => {
			test('should dispatch a user recommendations available request', async () => {
				fetchRecommendations.mockReturnValue(Promise.resolve({
					data: {
						properties: { 'just-for-you': true },
					}
				}))

				await loadRecommendations()(dispatch, getState)

				expect(featureSet).toHaveBeenCalledWith('justforyou', true, true)
				expect(dispatch).toHaveBeenCalled()
			})
		})

		describe('when the api responds with an error', async () => {
			const error = new Error('NO RECOMMENDATIONS')
			beforeEach(async () => {
				fetchRecommendations.mockReturnValue(Promise.reject(error))

				await loadRecommendations()(dispatch, getState)
			})

			test('should not dispatch a user recommendations available request', () => {
				expect(featureSet).not.toHaveBeenCalled()
				expect(dispatch).not.toHaveBeenCalled()
			})

			test('should log a notice', async () => {
				expect(logger.notice).toHaveBeenCalledWith(
					'Error loading recommendation data for user: ',
					error
				)
			})
		})
	})
})
