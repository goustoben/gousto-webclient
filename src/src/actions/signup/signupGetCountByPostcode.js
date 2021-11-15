import { getAccessToken } from "selectors/auth"
import logger from "utils/logger"
import { signupSetSocialBelongingOptions } from "actions/signup/signupSetSocialBelongingOptions"
import { fetchCountByPostcode } from "apis/signup/fetchCountByPostcode"

export const signupGetCountByPostcode = (postcode) => async (dispatch, getState) => {
  let socialBelongingOptions = {}
  try {
    const accessToken = getAccessToken(getState())
    const {data} = await fetchCountByPostcode(accessToken, {postcode})
    socialBelongingOptions = data
  } catch (e) {
    logger.error('No users found in current area')
  } finally {
    dispatch(signupSetSocialBelongingOptions(socialBelongingOptions))
  }
}
