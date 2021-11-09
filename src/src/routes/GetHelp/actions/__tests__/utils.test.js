import { logger } from 'utils/logger'
import webClientStatusActions from 'actions/status'
import { asyncAndDispatch } from '../utils'

jest.mock('utils/logger', () => ({
  error: jest.fn(),
}))

// Tests inside this describe don't clear the mocks after each test intentionally
describe('asyncAndDispatch', () => {
  const dispatch = jest.fn()
  const handleError = jest.fn()
  const ACTION_TYPE = 'ACTION_TYPE'
  const ERROR_MESSAGE = 'A custom error message'
  const PAYLOAD = {
    aField: 'a value'
  }
  const ERROR_THROWN = {
    status: '500',
    message: 'api error message',
  }

  // Tests inside this describe are intentionally not independent
  describe('before the getPayload resolves', () => {
    let resolvegetPayload
    const getPayload = jest.fn().mockReturnValue(
      new Promise((resolve) => { resolvegetPayload = resolve })
    )

    beforeAll(() => {
      jest.clearAllMocks()
      // Intentionally not awaiting for it
      asyncAndDispatch({
        dispatch,
        actionType: ACTION_TYPE,
        getPayload,
        handleError,
        errorMessage: ERROR_MESSAGE,
      })
    })

    test('dispatches an action to set the pending status of the action type passed to true', () => {
      expect(dispatch).toHaveBeenCalledWith(
        webClientStatusActions.pending(ACTION_TYPE, true)
      )
    })

    test('dispatches an action to set the error status of the action type passed to null', () => {
      expect(dispatch).toHaveBeenCalledWith(
        webClientStatusActions.error(ACTION_TYPE, null)
      )
    })

    test('dispatch is not called more times', () => {
      expect(dispatch).toHaveBeenCalledTimes(2)
    })

    test('calls the getPayload passed', () => {
      expect(getPayload).toHaveBeenCalledTimes(1)
    })

    test('does not call the handleError passed', () => {
      expect(handleError).not.toHaveBeenCalled()
    })

    describe('after the getPayload resolves', () => {
      beforeAll(() => {
        resolvegetPayload(PAYLOAD)
      })

      test('dispatches an action of the action type passed and the payload returned by getPayload', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ACTION_TYPE,
          payload: PAYLOAD,
        })
      })

      test('dispatches an action to set the pending status of the action type passed to false', () => {
        expect(dispatch).toHaveBeenCalledWith(
          webClientStatusActions.pending(ACTION_TYPE, false)
        )
      })

      test('dispatch was called 4 times', () => {
        expect(dispatch).toHaveBeenCalledTimes(4)
      })

      test('does not call the handleError passed', () => {
        expect(handleError).not.toHaveBeenCalled()
      })
    })
  })

  describe('when the getPayload returns null', () => {
    beforeAll(async () => {
      jest.clearAllMocks()
      await asyncAndDispatch({
        dispatch,
        actionType: ACTION_TYPE,
        getPayload: () => new Promise((resolve) => { resolve(null) }),
        handleError,
        errorMessage: ERROR_MESSAGE,
      })
    })

    test('it does not dispatch an action of the action type passed', () => {
      expect(dispatch).not.toHaveBeenCalledWith(
        expect.objectContaining({
          type: ACTION_TYPE,
        })
      )
    })
  })

  describe('when the getPayload throws an error', () => {
    beforeAll(async () => {
      jest.clearAllMocks()
      await asyncAndDispatch({
        dispatch,
        actionType: ACTION_TYPE,
        getPayload: () => new Promise((_resolve, reject) => { reject(ERROR_THROWN) }),
        handleError,
        errorMessage: ERROR_MESSAGE,
      })
    })

    test('handleError is called with the ERROR from the catch', () => {
      expect(handleError).toHaveBeenCalledTimes(1)
      expect(handleError).toHaveBeenCalledWith(ERROR_THROWN)
    })

    test('dispatches an action to set the error status of the action type passed to the message of the error thrown', () => {
      expect(dispatch).toHaveBeenCalledWith(
        webClientStatusActions.error(ACTION_TYPE, ERROR_THROWN.message)
      )
    })

    test('logs the error message passed and the error thrown', () => {
      expect(logger.error).toHaveBeenCalledWith({
        message: ERROR_MESSAGE,
        errors: [ERROR_THROWN],
      })
    })

    test('dispatches an action to set the pending status of the action type passed to false', () => {
      expect(dispatch).toHaveBeenCalledWith(
        webClientStatusActions.pending(ACTION_TYPE, false)
      )
    })

    test('dispatch was called 4 times', () => {
      expect(dispatch).toHaveBeenCalledTimes(4)
    })
  })
})
