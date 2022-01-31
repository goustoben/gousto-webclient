import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { getSessionId } from 'selectors/cookies'
import { use5RecipesPaintedDoorTest } from './use5RecipesPaintedDoorTest'
import { getAuthUserId } from 'selectors/auth'

export const useFiveRecipesTracking = () => {
  const { experimentId } = use5RecipesPaintedDoorTest()
  const dispatch = useDispatch()
  const userId = useSelector(getAuthUserId)

  const trackingData = {
    experiment_id: experimentId,
    experiment_name: experimentId,
    user_logged_in: Boolean(userId),
    session_id: getSessionId(),
    user_id: userId,
  }

  const track = (trackingType: string, additionalData?: { [key: string]: string | number }) =>
    dispatch({
      type: actionTypes.TRACKING,
      trackingData: { ...trackingData, actionType: trackingType, ...(additionalData || {}) },
    })

  return track
}
