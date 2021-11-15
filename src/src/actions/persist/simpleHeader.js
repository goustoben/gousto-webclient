import { actionTypes } from "actions/actionTypes"

export const simpleHeader = (persist) => (
  (dispatch) => {
    dispatch({
      type: actionTypes.PERSIST_SIMPLE_HEADER,
      persist,
    })
  }
)
