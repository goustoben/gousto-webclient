import { actionTypes } from "actions/actionTypes"
import logger from "utils/logger"
import { fetchFeatures } from "apis/fetchS3/fetchFeatures"

export const authChangeRecaptcha = () => async (dispatch) => {
  try {
    const {data} = await fetchFeatures()
    if (data) {
      const {isRecaptchaEnabled} = data
      await dispatch({
        type: actionTypes.CHANGE_RECAPTCHA,
        isRecaptchaEnabled
      })
    }
  } catch (err) {
    logger.error({message: 'S3File fetch failed'})
  }
}
