/* eslint-disable */
jest.mock('utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn()
}))
import Immutable from 'immutable'
import { safeJestMock } from '_testing/mocks'
import optimizelySdk from '@optimizely/optimizely-sdk'
import { loadOptimizelySDK } from '../optimizely'
import {instance as OptimizelySDKModule } from '../../containers/OptimizelyRollouts/optimizelySDK'
import logger from 'utils/logger'
/* eslint-enable */

describe('optimizely actions', () => {
  let dispatch
  beforeEach(() => {
    dispatch = jest.fn()
  })

  let getState = jest.fn().mockReturnValue({
    auth: Immutable.fromJS({
      id: ''
    })
  })

  describe('loadOptimizelySDK', () => {
    describe('when no autUserId is passed', () => {
      test('should not dispatch any follow up actions', async () => {
        const thunk = loadOptimizelySDK()
        await thunk(dispatch, getState)
        expect(dispatch).not.toHaveBeenCalled()
      })
    })

    describe('when authUserId is present', () => {
      beforeEach(() => {
        getState = jest.fn().mockReturnValue({
          auth: Immutable.fromJS({
            id: '1234'
          })
        })
        OptimizelySDKModule.getOptimizelyInstance = jest.fn()
      })

      test('should load SDK and dispatch actions', async () => {
        const thunk = loadOptimizelySDK()
        await thunk(dispatch, getState)
        expect(dispatch).toHaveBeenCalled()
      })
    })

    describe('when hasInstance returns true', () => {
      beforeEach(() => {
        getState = jest.fn().mockReturnValue({
          auth: Immutable.fromJS({
            id: '1234'
          })
        })
        OptimizelySDKModule.hasInstance = jest.fn().mockReturnValue(true)
      })

      test('should not load SDK', async () => {
        const thunk = loadOptimizelySDK()
        await thunk(dispatch, getState)
        expect(dispatch).not.toHaveBeenCalled()
      })
    })

    describe('when isLoading returns true', () => {
      beforeEach(() => {
        getState = jest.fn().mockReturnValue({
          auth: Immutable.fromJS({
            id: '1234'
          })
        })
        OptimizelySDKModule.hasInstance = jest.fn().mockReturnValue(false)
        OptimizelySDKModule.isLoading = jest.fn().mockReturnValue(true)
      })

      test('should not load SDK', async () => {
        const thunk = loadOptimizelySDK()
        await thunk(dispatch, getState)
        expect(dispatch).not.toHaveBeenCalled()
      })
    })

    describe('when getOptimizelyInstance throws', () => {
      beforeEach(() => {
        getState = jest.fn().mockReturnValue({
          auth: Immutable.fromJS({
            id: '1234'
          })
        })
        OptimizelySDKModule.getOptimizelyInstance = jest.fn().mockRejectedValue(new Error('Nope'))
        OptimizelySDKModule.hasInstance = jest.fn().mockReturnValue(false)
        OptimizelySDKModule.isLoading = jest.fn().mockReturnValue(false)
      })

      test('should log an error', async () => {
        const thunk = loadOptimizelySDK()
        await thunk(dispatch, getState)
        expect(logger.error).toHaveBeenCalledWith({ message: 'Cannot load optimizely', err: new Error('Nope') })
      })
    })
  })
})
