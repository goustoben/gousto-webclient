import Perfume from 'perfume.js'

const metricsToTrack = [
  'ttfb', 'fcp', 'fid', 'lcp', 'cls'
]

export class PerformanceTracker {
  constructor() {
    this.metrics = []
  }

  setSender(sender) {
    this.sender = sender
    this.sendSavedMetrics()
  }

  onPerfumeMetric(options) {
    const { metricName, data } = options
    if (!metricsToTrack.includes(metricName)) {
      return
    }

    if (!this.sender) {
      this.metrics.push({ metricName, data })
    } else {
      this.sendPerformanceMetric(metricName, data)
    }
  }

  sendSavedMetrics() {
    this.metrics.forEach(metric => {
      const { metricName, data } = metric
      this.sendPerformanceMetric(metricName, data)
    })
  }

  sendPerformanceMetric(metricName, data) {
    this.sender.sendPerformanceMetric(metricName, data)
  }
}

export const trackerVarName = '__performanceTracker__'

export const createTrackerInitializePerfume = () => {
  if (window[trackerVarName]) {
    // If coming from performanceTracker entry point, this handles an edge
    // case: main bundle loaded faster and already initialized Perfume.js.
    return window[trackerVarName]
  }
  const tracker = new PerformanceTracker()
  window[trackerVarName] = tracker

  // eslint-disable-next-line no-new
  new Perfume({
    analyticsTracker: (options) => tracker.onPerfumeMetric(options),
  })

  return tracker
}
