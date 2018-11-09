import actionTypes from './actionTypes'
import { fetchContentBySlug } from 'apis/content'
import logger from 'utils/logger'
import statusActions from './status'

export const contentLoadContentByPageSlug = (pageSlug = '', variation = 'default') => (
  async (dispatch, getState) => {
    try {
      dispatch(statusActions.pending(actionTypes.CONTENT_RECEIVE, true))
      const { data: content } = await fetchContentBySlug(getState().auth.get('accessToken'), pageSlug, { vars: variation })
      dispatch({ type: actionTypes.CONTENT_RECEIVE, content })
    } catch (err) {
      logger.error(err.message)
    }
    dispatch(statusActions.pending(actionTypes.CONTENT_RECEIVE, false))
  }
)

export const loadContentVariants = (variants = {}) => (
  async (dispatch) => {
    dispatch({
      type: actionTypes.CONTENT_VARIANTS_RECEIVE,
      variants,
    })
  }
)

export default {
  contentLoadContentByPageSlug,
}
