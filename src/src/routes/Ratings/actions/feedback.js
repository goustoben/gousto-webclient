import { actionTypes } from 'actions/actionTypes'
import * as feedbackApi from '../apis/feedback'
import { getAccessToken } from '../../../selectors/auth'

export const userRecipeRatings = () => async (dispatch, getState) => {
  const accessToken = getAccessToken(getState())
  const {
    data: {
      meta: { totalRecipeCount: feedbackCount },
    },
  } = await feedbackApi.getUserFeedbackCount(accessToken)

  dispatch({
    type: actionTypes.FEEDBACK_COUNT_RECEIVED,
    payload: feedbackCount,
  })
}
