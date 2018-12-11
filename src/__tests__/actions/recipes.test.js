import Immutable from 'immutable'

import logger from 'utils/logger'
import { featureSet } from 'actions/features'
import { fetchRecommendations } from 'apis/recipes'

import { loadRecommendations } from ' ../../src/routes/Menu/fetchData/fetchData'
import { saveRecommendations } from '../../src/actions/recipes'

jest.mock('utils/logger')
jest.mock('apis/recipes', () => ({
  fetchRecommendations: jest.fn(),
}))
jest.mock('actions/recipes', () => ({
  saveRecommendations: jest.fn(),
}))
jest.mock('actions/features', () => ({
  featureSet: jest.fn(),
}))

describe('recipe actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  const store = {
    getState,
    dispatch
  }

  afterEach(() => {
    dispatch.mockClear()
    getState.mockClear()
    featureSet.mockClear()
  })

  describe('loadRecommendations', () => {
    beforeEach(() => {
      getState.mockReturnValue({
        auth: Immutable.Map({
          accessToken: 'testToken1334',
        }),
      })
    })

    test('should dispatch a fetch request containing the accessToken', async () => {
      await loadRecommendations(store)
    
      expect(fetchRecommendations).toHaveBeenCalledWith('testToken1334')
    })

    describe('when the api responds with no recommendations', () => {
      test('should set user recommendations as not available', async () => {
        fetchRecommendations.mockReturnValue(Promise.resolve({
          data: [],
        }))
    
        await loadRecommendations(store)
    
        expect(dispatch).toHaveBeenCalled()

        expect(saveRecommendations).toHaveBeenCalledWith(false)
      })
    })
    
    describe('when the api responds with recommendations turned off', () => {
      test('should set user recommendations as not available', async () => {
        fetchRecommendations.mockReturnValue(Promise.resolve({
          data: [
            { properties: { 'just-for-you': false }, },
          ],
        }))
    
        await loadRecommendations(store)
    
        expect(dispatch).toHaveBeenCalled()
        expect(saveRecommendations).toHaveBeenCalledWith(false)
      })
    })
    
    describe('when the api responds with recommendations turned on', () => {
      test('should dispatch a user recommendations available request', async () => {
        fetchRecommendations.mockReturnValue(Promise.resolve({
          data: [
            { properties: { 'just-for-you': true }, },
          ],
        }))
    
        await loadRecommendations(store)
    
        expect(dispatch).toHaveBeenCalled()
        expect(saveRecommendations).toHaveBeenCalledWith(true)
      })
    })

    describe('when the api responds with an error', async () => {
      const error = new Error('NO RECOMMENDATIONS')
      beforeEach(async () => {
        fetchRecommendations.mockReturnValue(Promise.reject(error))
    
        await loadRecommendations(store)
      })
    
      test('should not dispatch a user recommendations available request', () => {
        expect(dispatch).toHaveBeenCalled()
        expect(saveRecommendations).toHaveBeenCalledWith(false)
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
