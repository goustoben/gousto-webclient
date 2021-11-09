import { logger } from 'utils/logger'
import { awinServerToServer } from 'apis/awin'

export const sendAwinS2SData = (awinParams) => async (dispatch) => {
  try {
    await dispatch(awinServerToServer(awinParams))
  } catch (err) {
    logger.warning('error saving parameters for AWIN', err)
  }
}
