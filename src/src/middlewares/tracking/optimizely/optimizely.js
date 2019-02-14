
import windowUtils from 'utils/window'

const sendTrackingData = ({eventName, tags}) => {
  const trackingData = {
    type: 'event',
    eventName,
    tags,
  }
  // console.log('im trying to push', trackingData) //eslint-disable-line
  windowUtils.getWindow().optimizely.push(trackingData)
}

export const optimizelyTracker = () => (
  next => action => {
    console.log('in optimizely middleware') //eslint-disable-line
    if (action.optimizelyData && windowUtils.getWindow().optimizely) {
      sendTrackingData(action.optimizelyData)
    }

    next(action)
  }
)
