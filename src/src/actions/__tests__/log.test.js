import { logLevels } from "actions/log/logLevels"
import { feLoggingLogEvent } from "actions/log/feLoggingLogEvent"
import { trackSuccessfulCheckoutFlow } from "actions/log/trackSuccessfulCheckoutFlow"
import { trackFailedCheckoutFlow } from "actions/log/trackFailedCheckoutFlow"
import { log } from "apis/log/log"

jest.mock('apis/log', () => ({
  log: jest.fn(() => Promise.resolve()),
}))

jest.mock('selectors/checkout', () => ({
  getFeLoggingCorrelationData: jest.fn(() => ({
    session_id: 'fake_session_id',
    gousto_ref: 'fake_gousto_ref',
  })),
}))

describe('log actions', () => {
  const getState = () => {}
  const dispatch = (action) => {
    action(dispatch, getState)
  }
  const message = 'Test message'
  const data = { foo: 'bar' }

  beforeEach(() => {
    log.mockClear()
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
          name: 'Error',
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
      await feLoggingLogEvent(logLevels.info, message, data)(dispatch, getState)

      expect(log).toHaveBeenCalled()
    })
  })
})
