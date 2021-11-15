import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import logger from "utils/logger"
import { fetchContentBySlug } from "apis/content/fetchContentBySlug"

export const contentLoadContentByPageSlug = (pageSlug = '', variation = 'default') => (
  async (dispatch, getState) => {
    try {
      dispatch(pending(actionTypes.CONTENT_RECEIVE, true))
      const {data: content} = await fetchContentBySlug(getState().auth.get('accessToken'), pageSlug, {vars: variation})
      dispatch({type: actionTypes.CONTENT_RECEIVE, content})
    } catch (err) {
      logger.critical(err)
    }
    dispatch(pending(actionTypes.CONTENT_RECEIVE, false))
  }
)
