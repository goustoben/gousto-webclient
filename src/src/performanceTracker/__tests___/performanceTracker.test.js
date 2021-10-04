import Perfume from 'perfume.js'
import { trackerVarName, PerformanceTracker, createTrackerInitializePerfume } from '../performanceTracker'

jest.mock('perfume.js', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('PerformanceTracker', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const sender = {
    sendPerformanceMetric: jest.fn(),
  }

  describe('when it receives a Perfume.js metric and the sender is not yet set', () => {
    const tracker = new PerformanceTracker()

    test('then it should store metrics for sending later', () => {
      tracker.onPerfumeMetric({ metricName: 'fcp', data: 123 })
      tracker.onPerfumeMetric({ metricName: 'lcp', data: 456 })

      expect(tracker.metrics).toHaveLength(2)
    })

    describe('when sender is set', () => {
      test('then it should send the saved metrics', () => {
        tracker.setSender(sender)

        expect(sender.sendPerformanceMetric).toHaveBeenNthCalledWith(1, 'fcp', 123)
        expect(sender.sendPerformanceMetric).toHaveBeenNthCalledWith(2, 'lcp', 456)
      })
    })
  })

  describe('when it receives a Perfume.js metric and the sender is set', () => {
    let tracker

    beforeEach(() => {
      tracker = new PerformanceTracker()
      tracker.setSender(sender)
    })

    const cases = [['ttfb'] , ['fcp'], ['fid'], ['lcp'], ['cls']]

    describe.each(cases)('when metric is "%s"', (metricName) => {
      test('then it should send the metric', () => {
        tracker.onPerfumeMetric({ metricName, data: 123 })

        expect(sender.sendPerformanceMetric).toHaveBeenCalledWith(metricName, 123)
      })
    })

    describe('when metric is one we do not care about', () => {
      test('then it should not be logged', () => {
        tracker.onPerfumeMetric({ metricName: 'lcpFinal', data: 123 })

        expect(sender.sendPerformanceMetric).not.toHaveBeenCalled()
      })
    })
  })
})

describe('given createTrackerInitializePerfume is called', () => {
  const mockTracker = {}
  describe('when global tracker is already initialized', () => {
    beforeEach(() => {
      global[trackerVarName] = mockTracker
    })

    test('then it should not create a new one', () => {
      const tracker = createTrackerInitializePerfume()
      expect(Perfume).not.toHaveBeenCalled()
      expect(tracker).toBe(mockTracker)
    })
  })
})
