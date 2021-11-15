import { userLoadReferralDetails } from "actions/user/userLoadReferralDetails"
import logger from "utils/logger"
import { referralDetails } from "apis/users/referralDetails"

export const userGetReferralDetails = () => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.get('accessToken')
    const {data} = await referralDetails(accessToken)

    dispatch(userLoadReferralDetails(data))
  } catch (err) {
    logger.error({message: 'Failed to fetch referral details', errors: [err]})
  }
}
