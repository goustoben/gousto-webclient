import { actionTypes } from './actionTypes'

export const persistActions = {
  simpleHeader: (persist) => (
    (dispatch) => {
      dispatch({
        type: actionTypes.PERSIST_SIMPLE_HEADER,
        persist,
      })
    }
  ),
}
