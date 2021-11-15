import { getAccessToken, getAuthUserId } from "selectors/auth"
import { get } from "utils/cookieHelper2"
import Cookies from "utils/GoustoCookies"
import { fetchBrandInfo } from "apis/brand/fetchBrandInfo"
import { brandDataReceived } from "routes/Menu/actions/brandData/brandDataReceived"
import logger from "utils/logger"

export function getBrandInfo() {
    return async (dispatch, getState) => {
        const accessToken = getAccessToken(getState())
        const sessionId = get(Cookies, 'gousto_session_id', false, false)
        const userId = getAuthUserId(getState())

        try {
            const brandResponse = await fetchBrandInfo(accessToken, sessionId, userId)
            dispatch(brandDataReceived(brandResponse))
        } catch (err) {
            logger.notice({message: `Brand Theme failed to load: ${err.message}`, errors: [err]})
        }
    }
}
