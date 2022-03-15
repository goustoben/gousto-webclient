import { useDispatch } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'

type TrackData = {
  event: string
  [key: string]: string | number | boolean
}

export const useCreateTrackEvent = (trackingData?: TrackData) => {
  const dispatch = useDispatch()

  const trackEvent = (trackingDataForFn?: TrackData) => {
    dispatch({
      type: actionTypes.TRACKING,
      trackingData: trackingDataForFn || trackingData,
    })
  }

  return trackEvent
}
