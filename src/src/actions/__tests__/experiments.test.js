import Immutable from 'immutable'
import { safeJestMock } from '_testing/mocks'
import logger from 'utils/logger'
import Cookies from 'utils/GoustoCookies'
import * as apis from 'apis/userBucketing'
import { actionTypes } from '../actionTypes'
import { fetchUserExperiments, appendUserExperiment, storeUserExperiments, removeUserExperiments } from '../experiments'

const mockedCookieGet = safeJestMock(Cookies, 'get')
const mockedLoggerError = safeJestMock(logger, 'error')
const mockedGetUserExperiments = safeJestMock(apis, 'getUserExperiments')

describe('experiments Actions', () => {
  let dispatch
  let getState

  beforeEach(() => {
    dispatch = jest.fn()
    mockedCookieGet.mockReturnValue('')
    mockedGetUserExperiments.mockResolvedValue({ data: [] })
    getState = jest.fn().mockReturnValue({
      auth: Immutable.Map({
        id: 'mock-user-id'
      }),
      experiments: Immutable.Map({
        hasfetchedExperiments: false,
      }),
      pending: Immutable.Map({
        [actionTypes.EXPERIMENTS_FETCHING]: true
      })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('storeUserExperiments', () => {
    test('returns correct structure', () => {
      const result = storeUserExperiments([])

      expect(result).toEqual({
        type: actionTypes.EXPERIMENTS_RECEIVED,
        payload: {
          experiments: []
        }
      })
    })
  })

  describe('removeUserExperiments', () => {
    test('returns correct structure', () => {
      const result = removeUserExperiments()

      expect(result).toEqual({
        type: actionTypes.EXPERIMENTS_REMOVE,
        payload: {}
      })
    })
  })

  describe('appendUserExperiment', () => {
    test('returns correct structure', () => {
      const result = appendUserExperiment({
        mock: 'experiment'
      })

      expect(result).toEqual({
        type: actionTypes.EXPERIMENTS_APPEND,
        payload: {
          experiment: { mock: 'experiment' }
        }
      })
    })
  })

  describe('fetchUserExperiments', () => {
    describe('When no sessionId is given', () => {
      test('should not fetch user experiments', async () => {
        const thunk = fetchUserExperiments()
        await thunk(dispatch, getState)

        expect(mockedGetUserExperiments).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
      })
    })

    describe('When experiments are being fetched', () => {
      test('should not re-fetch user experiments', async () => {
        const thunk = fetchUserExperiments()
        await thunk(dispatch, getState)

        expect(mockedGetUserExperiments).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
      })
    })

    describe('When experiments have already been fetched', () => {
      beforeEach(() => {
        getState = jest.fn().mockReturnValue({
          auth: Immutable.Map({
            id: 'mock-user-id'
          }),
          experiments: Immutable.Map({
            hasfetchedExperiments: true,
          }),
          pending: Immutable.Map({
            [actionTypes.EXPERIMENTS_FETCHING]: false
          })
        })
      })

      test('should not re-fetch user experiments', async () => {
        const thunk = fetchUserExperiments()
        await thunk(dispatch, getState)

        expect(mockedGetUserExperiments).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
      })
    })

    describe('When sessionId is given', () => {
      beforeEach(() => {
        getState = jest.fn().mockReturnValue({
          auth: Immutable.fromJS({
            id: 'mock-user-id'
          }),
          experiments: Immutable.Map({
            hasfetchedExperiments: false,
          }),
          pending: Immutable.Map({
            [actionTypes.EXPERIMENTS_FETCHING]: false
          })
        })

        mockedCookieGet.mockReturnValue('mock-session-id')
      })

      describe('When fetching user experiments', () => {
        beforeEach(() => {
          mockedGetUserExperiments.mockResolvedValue({
            data: [{
              name: 'mock-experiment',
              bucket: 'control',
              withinExperiment: true
            }]
          })
        })

        test('should set statusActions PENDING to true', async () => {
          const thunk = fetchUserExperiments()
          await thunk(dispatch, getState)

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            key: actionTypes.EXPERIMENTS_FETCHING,
            type: actionTypes.PENDING,
            value: true
          })
        })

        test('should call getUserExperiments', async () => {
          const thunk = fetchUserExperiments()
          await thunk(dispatch, getState)

          expect(mockedGetUserExperiments).toHaveBeenCalledWith('mock-session-id', 'mock-user-id')
        })

        test('should store user experiments', async () => {
          const thunk = fetchUserExperiments()
          await thunk(dispatch, getState)

          expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: actionTypes.EXPERIMENTS_RECEIVED,
            payload: {
              experiments: [{
                name: 'mock-experiment',
                bucket: 'control',
                withinExperiment: true
              }]
            }
          })
        })

        test('should set statusActions PENDING to false when finished', async () => {
          const thunk = fetchUserExperiments()
          await thunk(dispatch, getState)

          expect(dispatch).toHaveBeenNthCalledWith(3, {
            key: actionTypes.EXPERIMENTS_FETCHING,
            type: actionTypes.PENDING,
            value: false
          })
        })
      })

      describe('When an error occurs', () => {
        beforeEach(() => {
          mockedGetUserExperiments.mockRejectedValue(new Error('Failed to fetch experiments'))
        })

        test('should log an error', async () => {
          const thunk = fetchUserExperiments()
          await thunk(dispatch, getState)

          expect(mockedLoggerError).toHaveBeenCalledWith({
            message: 'Failed to retrieve user experiments',
            extra: { error: new Error('Failed to fetch experiments') }
          })
        })

        test('should reset statusActions pending to false', async () => {
          const thunk = fetchUserExperiments()
          await thunk(dispatch, getState)

          expect(dispatch).toHaveBeenNthCalledWith(2, {
            key: actionTypes.EXPERIMENTS_FETCHING,
            type: actionTypes.PENDING,
            value: false
          })
        })
      })
    })
  })
})
