import windowUtils from 'utils/window'

const sendTrackingData = ({ type, eventName, tags = {}, attributes = {} }) => {
  let revenueInPence

  if (tags && parseFloat(tags.revenue)) {
    revenueInPence = Math.round(tags.revenue * 100)
  }

  const tagsObject = revenueInPence
    ? { ...tags, revenue: revenueInPence }
    : { ...tags }

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
