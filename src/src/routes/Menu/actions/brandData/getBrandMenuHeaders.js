import { getAccessToken, getAuthUserId } from "selectors/auth"
import { get } from "utils/cookieHelper2"
import Cookies from "utils/GoustoCookies"
import { fetchBrandMenuHeaders } from "apis/brand/fetchBrandMenuHeaders"
import logger from "utils/logger"
import { menuCollectionsHeadersReceived } from "routes/Menu/actions/brandData/menuCollectionsHeadersReceived"

export function getBrandMenuHeaders() {
    return async (dispatch, getState) => {
        const accessToken = getAccessToken(getState())
        const sessionId = get(Cookies, 'gousto_session_id', false, false)
        const userId = getAuthUserId(getState())
        const {data: apiData} = await fetchBrandMenuHeaders(accessToken, sessionId, userId)

        if (!apiData) {
            logger.error({message: 'Fetch Menu Headers failed'})

            return
        }

        const {data, included} = apiData
        const collectionHeaders = {
            collectionsPerMenu: data,
            headers: included
        }

        dispatch(menuCollectionsHeadersReceived(collectionHeaders))
    }
}
