import { actionTypes } from "actions/actionTypes"

export const loadContentVariants = (variants = {}) => (
  async (dispatch) => {
    dispatch({
      type: actionTypes.CONTENT_VARIANTS_RECEIVE,
      variants,
    })
  }
)
