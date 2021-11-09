import Immutable from 'immutable'
import { safeJestMock } from '_testing/mocks'
import { logger } from 'utils/logger'
import { Cookies } from 'utils/GoustoCookies'
import * as apis from 'apis/userBucketing'
import { actionTypes } from '../actionTypes'
import { experimentBucketedUser } from '../trackingKeys'
import * as actions from '../experiments'

const mockedCookieGet = safeJestMock(Cookies, 'get')
const mockedLoggerError = safeJestMock(logger, 'error')
const mockedLoggerInfo = safeJestMock(logger, 'info')
const mockedGetUserExperiments = safeJestMock(apis, 'getUserExperiments')
const mockedUpdateUserExperiment = safeJestMock(apis, 'updateUserExperiment')

describe('experiments Actions', () => {
  let dispatch
  let getState

  beforeEach(() => {
    dispatch = jest.fn()
    mockedCookieGet.mockReturnValue('')
    mockedGetUserExperiments.mockResolvedValue({ data: [] })
    mockedUpdateUserExperiment.mockResolvedValue({ data: {} })
    getState = jest.fn().mockReturnValue({
      auth: Immutable.Map({
        id: 'mock-user-id'
      }),
      experiments: Immutable.Map({
        hasfetchedExperiments: false,
      }),
      pending: Immutable.Map({
        [actionTypes.EXPERIMENTS_FETCHING]: true,
        [actionTypes.EXPERIMENTS_ASSIGNING_USER]: true,
      })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('storeUserExperiments', () => {
    test('returns correct structure', () => {
      const result = actions.storeUserExperiments([])

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
      const result = actions.removeUserExperiments()

      expect(result).toEqual({
        type: actionTypes.EXPERIMENTS_REMOVE,
        payload: {}
      })
    })
  })

  describe('appendUserExperiment', () => {
    test('returns correct structure', () => {
      const result = actions.appendUserExperiment({
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

  describe('appendDefaultUserExperiment', () => {
    test('returns correct structure', () => {
      const result = actions.appendDefaultUserExperiment('mock-experiment')

      expect(result).toEqual({
        type: actionTypes.EXPERIMENTS_APPEND,
        payload: {
          experiment: {
            name: 'mock-experiment',
            bucket: 'control',
            withinExperiment: false,
          }
        }
      })
    })
  })

  describe('trackBucketedUser', () => {
    test('returns correct structure', () => {
      const result = actions.trackBucketedUser({
        experimentName: 'mock-experiment-name',
        withinExperiment: true,
        bucket: 'control'
      })

      expect(result).toEqual({
        type: actionTypes.EXPERIMENTS_TRACK_USER_BUCKETING,
        trackingData: {
          actionType: experimentBucketedUser,
          experimentName: 'mock-experiment-name',
          withinExperiment: true,
          bucket: 'control'
        }
      })
    })
  })

  describe('fetchUserExperiments', () => {
    describe('When no sessionId is given', () => {
      test('should not fetch user experiments', async () => {
        const thunk = actions.fetchUserExperiments()
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
          const thunk = actions.fetchUserExperiments()
          await thunk(dispatch, getState)

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            key: actionTypes.EXPERIMENTS_FETCHING,
            type: actionTypes.PENDING,
            value: true
          })
        })

        test('should call getUserExperiments', async () => {
          const thunk = actions.fetchUserExperiments()
          await thunk(dispatch, getState)

          expect(mockedGetUserExperiments).toHaveBeenCalledWith('mock-session-id', 'mock-user-id')
        })

        test('should store user experiments', async () => {
          const thunk = actions.fetchUserExperiments()
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
          const thunk = actions.fetchUserExperiments()
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
          const thunk = actions.fetchUserExperiments()
          await thunk(dispatch, getState)

          expect(mockedLoggerError).toHaveBeenCalledWith({
            message: 'Failed to retrieve user experiments',
            extra: { error: new Error('Failed to fetch experiments') }
          })
        })

        test('should reset statusActions pending to false', async () => {
          const thunk = actions.fetchUserExperiments()
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

  describe('assignUserToExperiment', () => {
    describe('When no experimentName is given', () => {
      test('should not assign a user to an experiment', async () => {
        const thunk = actions.assignUserToExperiment()
        await thunk(dispatch, getState)

        expect(mockedUpdateUserExperiment).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
      })
    })

    describe('When no sessionId is given', () => {
      test('should not assign a user to an experiment', async () => {
        const thunk = actions.assignUserToExperiment('mock-experiment')
        await thunk(dispatch, getState)

        expect(mockedUpdateUserExperiment).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
      })
    })

    describe('When sessionId and experimentName is given', () => {
      beforeEach(() => {
        getState = jest.fn().mockReturnValue({
          auth: Immutable.fromJS({
            id: 'mock-user-id'
          }),
          pending: Immutable.Map({
            [actionTypes.EXPERIMENTS_ASSIGNING_USER]: false
          })
        })

        mockedCookieGet.mockReturnValue('mock-session-id')
      })

      describe('When assigning a user to an experiment', () => {
        beforeEach(() => {
          mockedUpdateUserExperiment.mockResolvedValue({
            data: {
              name: 'mock-experiment',
              bucket: 'control',
              withinExperiment: true
            }
          })
        })

        test('should set statusActions PENDING to true', async () => {
          const thunk = actions.assignUserToExperiment('mock-experiment')
          await thunk(dispatch, getState)

          expect(dispatch).toHaveBeenNthCalledWith(1, {
            key: actionTypes.EXPERIMENTS_ASSIGNING_USER,
            type: actionTypes.PENDING,
            value: true
          })
        })

        test('should call updateUserExperiment', async () => {
          const thunk = actions.assignUserToExperiment('mock-experiment')
          await thunk(dispatch, getState)

          expect(mockedUpdateUserExperiment).toHaveBeenCalledWith('mock-experiment', 'mock-session-id', 'mock-user-id')
        })

        test('should call trackBucketedUser', async () => {
          const thunk = actions.assignUserToExperiment('mock-experiment')
          await thunk(dispatch, getState)

          expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: actionTypes.EXPERIMENTS_TRACK_USER_BUCKETING,
            trackingData: {
              actionType: experimentBucketedUser,
              experimentName: 'mock-experiment',
              bucket: 'control',
              withinExperiment: true
            }
          })
        })

        test('should append the returned user experiment to state', async () => {
          const thunk = actions.assignUserToExperiment('mock-experiment')
          await thunk(dispatch, getState)

          expect(dispatch).toHaveBeenNthCalledWith(3, {
            type: actionTypes.EXPERIMENTS_APPEND,
            payload: {
              experiment: {
                name: 'mock-experiment',
                bucket: 'control',
                withinExperiment: true
              }
            }
          })
        })

        test('should set statusActions PENDING to false when finished', async () => {
          const thunk = actions.assignUserToExperiment('mock-experiment')
          await thunk(dispatch, getState)

          expect(dispatch).toHaveBeenNthCalledWith(4, {
            key: actionTypes.EXPERIMENTS_ASSIGNING_USER,
            type: actionTypes.PENDING,
            value: false
          })
        })
      })

      describe('When an error occurs', () => {
        beforeEach(() => {
          mockedUpdateUserExperiment.mockRejectedValue(new Error('Failed to assign user to experiment'))
        })

        test('should log the issue', async () => {
          const thunk = actions.assignUserToExperiment('mock-experiment')
          await thunk(dispatch, getState)

          expect(mockedLoggerError).toHaveBeenCalledWith({
            message: 'Failed to assign user to an experiment',
            extra: { error: new Error('Failed to assign user to experiment') }
          })

          expect(mockedLoggerInfo).toHaveBeenCalledWith({
            message: 'Defaulting user to control bucket for experiment: mock-experiment'
          })
        })

        test('should append a default user experiment to state', async () => {
          const thunk = actions.assignUserToExperiment('mock-experiment')
          await thunk(dispatch, getState)

          expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: actionTypes.EXPERIMENTS_APPEND,
            payload: {
              experiment: {
                name: 'mock-experiment',
                bucket: 'control',
                withinExperiment: false
              }
            }
          })
        })

        test('should reset statusActions pending to false', async () => {
          const thunk = actions.assignUserToExperiment('mock-experiment')
          await thunk(dispatch, getState)

          expect(dispatch).toHaveBeenNthCalledWith(3, {
            key: actionTypes.EXPERIMENTS_ASSIGNING_USER,
            type: actionTypes.PENDING,
            value: false
          })
        })
      })
    })
  })

  describe('fetchOrAssignUserToExperiment', () => {
    describe('When no experiments have been fetched for a user', () => {
      beforeEach(() => {
        getState = jest.fn().mockReturnValue({
          experiments: Immutable.fromJS({
            experiments: {},
            fetchedExperiments: false
          }),
          pending: Immutable.Map({
            [actionTypes.EXPERIMENTS_FETCHING]: false
          })
        })
      })

      test('should dispatch "fetchUserExperiments" action', async () => {
        const mockedFetchUserExperiments = safeJestMock(actions, 'fetchUserExperiments')

        const thunk = actions.fetchOrAssignUserToExperiment()
        await thunk(dispatch, getState)

        expect(dispatch).toHaveBeenCalled()
        expect(mockedFetchUserExperiments).toHaveBeenCalled()

        mockedFetchUserExperiments.mockRestore()
      })
    })

    describe('When an experiment is not assigned to a user', () => {
      beforeEach(() => {
        getState = jest.fn().mockReturnValue({
          experiments: Immutable.fromJS({
            experiments: {},
            fetchedExperiments: true
          }),
          pending: Immutable.Map({
            [actionTypes.EXPERIMENTS_FETCHING]: false
          })
        })
      })

      test('should dispatch "assignUserToExperiment" action', async () => {
        const mockedAssignUserToExperiment = safeJestMock(actions, 'assignUserToExperiment')

        const thunk = actions.fetchOrAssignUserToExperiment()
        await thunk(dispatch, getState)

        expect(dispatch).toHaveBeenCalled()
        expect(mockedAssignUserToExperiment).toHaveBeenCalled()

        mockedAssignUserToExperiment.mockRestore()
      })
    })

    describe('When experiments have been fetched', () => {
      beforeEach(() => {
        getState = jest.fn().mockReturnValue({
          experiments: Immutable.fromJS({
            experiments: {
              'mock-experiment': {
                name: 'mock-experiment',
                bucket: 'control',
                withinExperiment: true
              }
            },
            fetchedExperiments: true
          }),
          pending: Immutable.Map({
            [actionTypes.EXPERIMENTS_FETCHING]: false
          })
        })
      })

      describe('When an experiment has been found', () => {
        test('does not fetch user experiments', async () => {
          const mockedFetchUserExperiments = safeJestMock(actions, 'fetchUserExperiments')

          const thunk = actions.fetchOrAssignUserToExperiment('mock-experiment')
          await thunk(dispatch, getState)

          expect(dispatch).not.toHaveBeenCalled()
          expect(mockedFetchUserExperiments).not.toHaveBeenCalled()

          mockedFetchUserExperiments.mockRestore()
        })

        test('does not assign user to experiment', async () => {
          const mockedAssignUserToExperiment = safeJestMock(actions, 'assignUserToExperiment')

          const thunk = actions.fetchOrAssignUserToExperiment('mock-experiment')
          await thunk(dispatch, getState)

          expect(dispatch).not.toHaveBeenCalled()
          expect(mockedAssignUserToExperiment).not.toHaveBeenCalled()

          mockedAssignUserToExperiment.mockRestore()
        })
      })
    })
  })
})
