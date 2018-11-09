import actionTypes from './actionTypes'

export default {
  simpleHeader: (persist) => (
    (dispatch) => {
      dispatch({
        type: actionTypes.PERSIST_SIMPLE_HEADER,
        persist,
      })
    }
  ),
}
