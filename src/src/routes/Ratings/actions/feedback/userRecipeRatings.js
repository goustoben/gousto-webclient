import { getAccessToken } from "selectors/auth"
import { actionTypes } from "actions/actionTypes"
import { getUserFeedbackCount } from "routes/Ratings/apis/feedback/getUserFeedbackCount"

export const userRecipeRatings = () => async (dispatch, getState) => {
    const accessToken = getAccessToken(getState())
    const {
        data: {
            meta: {totalRecipeCount: feedbackCount},
        },
    } = await getUserFeedbackCount(accessToken)

    dispatch({
        type: actionTypes.FEEDBACK_COUNT_RECEIVED,
        payload: feedbackCount,
    })
}
