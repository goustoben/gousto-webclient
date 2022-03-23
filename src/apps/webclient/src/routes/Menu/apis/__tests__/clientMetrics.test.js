import { renderHook } from '@testing-library/react-hooks'
import { safeJestMock } from '_testing/mocks'
import { fetch } from 'utils/fetch'
import logger from 'utils/logger'
import MockDate from 'mockdate'
import * as useOptimizely from 'containers/OptimizelyRollouts/useOptimizely.hook'
import {
  withMockEnvironmentAndDomain
} from '_testing/isomorphic-environment-test-utils'
import { sendClientMetric, useSendClientMetric } from '../clientMetrics'

jest.mock('utils/fetch', () => ({
  fetch: jest.fn().mockResolvedValue({ data: [1, 2, 3] })
}))

jest.mock('config/routes', () => ({
  version: {
    clientMetrics: 'v1',
  },
}))

describe('clientMetrics', () => {
  const mockLoggerWarning = safeJestMock(logger, 'warning')

  // mock the environment and domain config used by these tests to generate endpoints
  withMockEnvironmentAndDomain('production', 'gousto.co.uk')

  beforeEach(() => {
    const timestamp = 974851200000
    MockDate.set(timestamp)
    fetch.mockClear()
    mockLoggerWarning.mockClear()
  })

  afterEach(() => {
    MockDate.reset()
  })

  describe('useSendClientMetric', () => {
    test('with user id from optimizely', async () => {
      jest.spyOn(useOptimizely, 'useUserIdForOptimizely').mockReturnValue('user_id')

      const expectedReqData = {
        client: 'web',
        name: 'menu-load-complete',
        value: 1.0,
        unit: 'Count'
      }

      const headers = {
        'Content-Type': 'application/json',
        'x-gousto-device-id': undefined,
        'x-gousto-user-id': 'user_id',
      }

      const { result } = renderHook(() => useSendClientMetric())

      await result.current('menu-load-complete', 1.0, 'Count')

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'https://production-api.gousto.co.uk/clientmetrics/v1/metric', expectedReqData, 'POST', 'default', headers)
    })
  })

  describe('sendClientMetric', () => {
    describe('with a user id', () => {
      test('should POST the correct data to the correct endpoint', async () => {
        const expectedReqData = {
          client: 'web',
          name: 'menu-load-complete',
          value: 1.0,
          unit: 'Count'
        }

        const headers = {
          'Content-Type': 'application/json',
          'x-gousto-device-id': undefined,
          'x-gousto-user-id': 'userId',
        }

        await sendClientMetric('menu-load-complete', 1.0, 'Count', 'userId')

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(null, 'https://production-api.gousto.co.uk/clientmetrics/v1/metric', expectedReqData, 'POST', 'default', headers)
      })
    })

    describe('without a user id', () => {
      test('should POST the correct data to the correct endpoint', async () => {
        const expectedReqData = {
          client: 'web',
          name: 'menu-load-complete',
          value: 1.0,
          unit: 'Count'
        }

        const headers = {
          'Content-Type': 'application/json',
        }

        await sendClientMetric('menu-load-complete', 1.0, 'Count')

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(null, 'https://production-api.gousto.co.uk/clientmetrics/v1/metric', expectedReqData, 'POST', 'default', headers)
      })
    })

    describe('when fetch errors', () => {
      beforeEach(() => {
        fetch.mockRejectedValue(new Error('mock error'))
      })

      test('should call logger.warning', async () => {
        await sendClientMetric('menu-load-complete', 1.0, 'Count')

        expect(mockLoggerWarning).toHaveBeenCalledWith({
          message: 'Failed to send client metric',
          extra: {
            name: 'menu-load-complete',
            value: 1.0,
            unit: 'Count'
          },
          error: new Error('mock error')
        })
      })
    })
  })
})
