import { feLoggingLogEvent, logLevels } from 'actions/log'
import { getIsTrackPerformanceEnabled } from 'selectors/features'
import { trackerVarName, createTrackerInitializePerfume } from './performanceTracker'

const sendPerformanceMetric = (store, metricName, value) => {
  store.dispatch(
    feLoggingLogEvent(logLevels.info, 'performance metric', {
      metricName,
      value,
      pathname: window.location.pathname,
      userAgent: window.navigator.userAgent,
    })
  )
}

export const initializePerformanceTrackerSender = (store) => {
  if (!getIsTrackPerformanceEnabled(store.getState())) {
    return
  }

  let tracker = window[trackerVarName]
  if (!tracker) {
    // Edge case: performanceTracker entry point didn't load, or loaded slower
    // than the main bundle.
    tracker = createTrackerInitializePerfume()
    window[trackerVarName] = tracker
  }

  tracker.setSender({
    sendPerformanceMetric(metricName, value) {
      sendPerformanceMetric(store, metricName, value)
    },
  })
}
