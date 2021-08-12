import webClientStatusActions from 'actions/status'
import logger from 'utils/logger'

export const asyncAndDispatch = async ({
  dispatch,
  actionType,
  getPayload,
  handleError = null,
  errorMessage,
}) => {
  const { pending, error } = webClientStatusActions
  dispatch(pending(actionType, true))
  dispatch(error(actionType, null))
  try {
    const payload = await getPayload()

    // If you don't want it to dispatch return null in your getPayload function
    if (payload !== null) {
      dispatch({
        type: actionType,
        payload,
      })
    }
  } catch (err) {
    dispatch(error(actionType, err.message))
    logger.error({ message: errorMessage, errors: [err] })
    if (typeof handleError === 'function') {
      handleError(err)
    }
  } finally {
    dispatch(pending(actionType, false))
  }
}
