
import windowUtils from 'utils/window'

const sendTrackingData = ({ type, eventName, tags = {}, attributes = {} }) => {
  let revenueInPennies
  let tagsObject = {}

  if (tags && parseInt(tags.revenue)) {
    revenueInPennies = tags.revenue * 100
  }

  revenueInPennies ? tagsObject = { ...tags, revenue: revenueInPennies } : { ...tags }

  const trackingData = {
    type,
    eventName,
    tags: tagsObject,
    attributes: { ...attributes },
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
