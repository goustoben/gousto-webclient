import Perfume from 'perfume.js'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { recordPerformanceMetric } from 'actions/trackingKeys'
import { initializePerformanceTrackerSender } from '../initializePerformanceTrackerSender'
import { trackerVarName } from '../performanceTracker'

jest.mock('perfume.js', () => ({
  __esModule: true,
  default: jest.fn((options) => {
    options.analyticsTracker({ metricName: 'lcp', value: 123 })
  }),
}))

jest.mock('actions/tracking', () => ({
  trackUTMAndPromoCode: jest.fn(),
}))

const createStore = () => ({
  dispatch: jest.fn(),
  getState: () => ({}),
})

describe('initializePerformanceTrackerSender', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('given initializePerformanceTrackerSender is called', () => {
    describe('and when the global tracker is not set yet', () => {
      beforeEach(() => {
        initializePerformanceTrackerSender(createStore())
      })

      test('then it should initialize the tracker', () => {
        expect(Perfume).toHaveBeenCalled()

        expect(global[trackerVarName]).not.toBeUndefined()

        global[trackerVarName].sender.sendPerformanceMetric('lcp', 123, '/')

        expect(trackUTMAndPromoCode).toHaveBeenCalledWith(recordPerformanceMetric, {
          metricName: 'lcp',
          value: 123,
          page: '/',
        })
      })
    })

    describe('and when the global tracker has already been set', () => {
      const mockTracker = {
        setSender(sender) {
          this.sender = sender
        },
      }

      beforeEach(() => {
        global[trackerVarName] = mockTracker
        initializePerformanceTrackerSender(createStore())
      })

      test('then it should set sender for the existing tracker', () => {
        global[trackerVarName].sender.sendPerformanceMetric('lcp', 123, '/')

        expect(trackUTMAndPromoCode).toHaveBeenCalledWith(recordPerformanceMetric, {
          metricName: 'lcp',
          value: 123,
          page: '/',
        })
      })
    })
  })
})
