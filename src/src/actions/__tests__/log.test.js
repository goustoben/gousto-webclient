import {
  logInfo,
  logError,
  logCritical,
  trackSuccessfulCheckoutFlow,
  trackFailedCheckoutFlow,
} from 'actions/log'
import { log } from 'apis/log'

jest.mock('apis/log', () => ({
  log: jest.fn(() => Promise.resolve())
}))

jest.mock('selectors/checkout', () => ({
  getCheckoutLogData: jest.fn(() => ({
    session_id: 'fake_session_id',
    gousto_ref: 'fake_gousto_ref',
  }))
}))

describe('log actions', () => {
  const getState = () => {}
  const dispatch = (action) => {
    action()
  }
  const message = 'Test message'
  const data = { foo: 'bar' }

  beforeEach(() => {
    log.mockClear()
  })

  describe('logInfo', () => {
    test('should log with info level', async () => {
      await logInfo(message, data)(dispatch, getState)

      expect(log).toHaveBeenCalledWith('info', 'Test message', { foo: 'bar' })
    })
  })

  describe('logError', () => {
    test('should log with error level', async () => {
      const error = new Error('Test error')
      const expectedData = {
        foo: 'bar',
        error: {
          message: 'Test error',
          stack: expect.any(String),
          name: 'Error'
        }
      }

      await logError(message, error, data)(dispatch, getState)

      expect(log).toHaveBeenCalledWith('error', 'Test message', expectedData)
    })
  })

  describe('logCritical', () => {
    test('should log with critical level', async () => {
      const error = new Error('Test error')
      const expectedData = {
        foo: 'bar',
        error: {
          message: 'Test error',
          stack: expect.any(String),
          name: 'Error'
        }
      }

      await logCritical(message, error, data)(dispatch, getState)

      expect(log).toHaveBeenCalledWith('critical', 'Test message', expectedData)
    })
  })

  describe('trackSuccessfulCheckoutFlow', () => {
    test('should log info with correct details', async () => {
      const expected = {
        foo: 'bar',
        session_id: 'fake_session_id',
        gousto_ref: 'fake_gousto_ref',
      }

      await trackSuccessfulCheckoutFlow(message, data)(dispatch, getState)

      expect(log).toHaveBeenCalledWith('info', 'Test message', expected)
    })
  })

  describe('trackFailedCheckoutFlow', () => {
    test('should log error with correct details', async () => {
      const error = new Error('Test error')
      const expected = {
        error: {
          message: 'Test error',
          stack: expect.any(String),
          name: 'Error'
        },
        foo: 'bar',
        session_id: 'fake_session_id',
        gousto_ref: 'fake_gousto_ref',
      }

      await trackFailedCheckoutFlow(message, error, data)(dispatch, getState)

      expect(log).toHaveBeenCalledWith('error', 'Test message', expected)
    })
  })

  describe('when log request is failed', () => {
    beforeEach(() => {
      log.mockRejectedValueOnce(new Error('Test error'))
    })

    test('should catch the error', async () => {
      await logInfo(message, data)(dispatch, getState)

      expect(log).toHaveBeenCalled()
    })
  })
})
