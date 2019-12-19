import actionTypes from './actionTypes'

const persistActions = {
  simpleHeader: (persist) => (
    (dispatch) => {
      dispatch({
        type: actionTypes.PERSIST_SIMPLE_HEADER,
        persist,
      })
    }
  ),
}

export default persistActions
