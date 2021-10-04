import Immutable from 'immutable'
import Perfume from 'perfume.js'
import { feLoggingLogEvent } from 'actions/log'
import { initializePerformanceTrackerSender } from '../initializePerformanceTrackerSender'
import { trackerVarName } from '../performanceTracker'

jest.mock('perfume.js', () => ({
  __esModule: true,
  default: jest.fn((options) => {
    options.analyticsTracker({ metricName: 'lcp', value: 123 })
  }),
}))

jest.mock('actions/log', () => ({
  feLoggingLogEvent: jest.fn(),
  logLevels: {
    info: 'info',
    error: 'error',
    critical: 'critical',
  },
}))

const createStore = (trackPerformance) => ({
  dispatch: jest.fn(),
  getState: () => ({
    features: Immutable.fromJS({
      trackPerformance: {
        value: trackPerformance,
      },
    }),
  }),
})

describe('initializePerformanceTrackerSender', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('given initializePerformanceTrackerSender is called', () => {
    describe('when trackPerformance is on', () => {
      const mockTracker = {
        setSender(sender) {
          this.sender = sender
        },
      }

      describe('and when the global tracker is not set yet', () => {
        beforeEach(() => {
          initializePerformanceTrackerSender(createStore(true))
        })

        test('then it should initialize the tracker', () => {
          expect(Perfume).toHaveBeenCalled()

          expect(global[trackerVarName]).not.toBeUndefined()

          global[trackerVarName].sender.sendPerformanceMetric('lcp', 123)

          expect(feLoggingLogEvent).toHaveBeenCalledWith('info', 'performance metric', {
            metricName: 'lcp',
            value: 123,
            pathname: '/',
            userAgent: global.navigator.userAgent,
          })
        })
      })

      describe('and when the global tracker has already been set', () => {
        beforeEach(() => {
          global[trackerVarName] = mockTracker
          initializePerformanceTrackerSender(createStore(true))
        })

        test('then it should set sender for the existing tracker', () => {
          global[trackerVarName].sender.sendPerformanceMetric('lcp', 123)

          expect(feLoggingLogEvent).toHaveBeenCalledWith('info', 'performance metric', {
            metricName: 'lcp',
            value: 123,
            pathname: '/',
            userAgent: global.navigator.userAgent,
          })
        })
      })
    })

    describe('when trackPerformance is off', () => {
      beforeEach(() => {
        initializePerformanceTrackerSender(createStore(false))
      })

      test('then it should not initialize', () => {
        expect(Perfume).not.toHaveBeenCalled()
      })
    })
  })
})
