import { trackUTMAndPromoCode } from 'actions/tracking'
import { recordPerformanceMetric } from 'actions/trackingKeys'

import { trackerVarName, createTrackerInitializePerfume } from './performanceTracker'

const sendPerformanceMetric = (store, metricName, value, pathname) => {
  store.dispatch(
    trackUTMAndPromoCode(recordPerformanceMetric, {
      metricName,
      value,
      page: pathname,
    }),
  )
}

export const initializePerformanceTrackerSender = (store) => {
  let tracker = window[trackerVarName]
  if (!tracker) {
    // Edge case: performanceTracker entry point didn't load, or loaded slower
    // than the main bundle.
    tracker = createTrackerInitializePerfume()
    window[trackerVarName] = tracker
  }

  tracker.setSender({
    sendPerformanceMetric(metricName, value, pathname) {
      sendPerformanceMetric(store, metricName, value, pathname)
    },
  })
}
