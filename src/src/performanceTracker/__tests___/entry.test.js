import { createTrackerInitializePerfume } from '../performanceTracker'
import '../entry'

jest.mock('perfume.js', () => ({
  __esModule: true,
  default: jest.fn((options) => {
    options.analyticsTracker({ metricName: 'lcp', value: 123 })
  }),
}))

jest.mock('../performanceTracker', () => ({
  createTrackerInitializePerfume: jest.fn(),
}))

describe('given performanceTracker entry point is loaded', () => {
  test('then it should initialize tracker', () => {
    expect(createTrackerInitializePerfume).toHaveBeenCalled()
  })
})
