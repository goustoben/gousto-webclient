
import windowUtils from 'utils/window'

const sendTrackingData = ({eventName, tags}) => {
  let revenueInPennies
  if (tags && parseInt(tags.revenue)) {
    revenueInPennies = tags.revenue * 100
  }
  const trackingData = {
    type: 'event',
    eventName,
    tags: {...tags, revenue: revenueInPennies},
  }
  windowUtils.getWindow().optimizely.push(trackingData)
}

export const optimizelyTracker = () => (
  next => action => {
    if (action.optimizelyData && windowUtils.getWindow().optimizely) {
      sendTrackingData(action.optimizelyData)
    }

    next(action)
  }
)
