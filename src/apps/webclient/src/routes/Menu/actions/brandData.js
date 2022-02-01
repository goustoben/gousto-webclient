import logger from 'utils/logger'
import { getAccessToken , getAuthUserId } from 'selectors/auth'
import Cookies from 'utils/GoustoCookies'
import { get } from 'utils/cookieHelper2'
import { fetchBrandMenuHeaders } from 'apis/brand'
import { actionTypes } from '../../../actions/actionTypes'

export const menuCollectionsHeadersReceived = (collectionHeaders) => ({
  type: actionTypes.MENU_COLLECTIONS_HEADERS_RECEIVED,
  payload: {
    collectionHeaders
  }
})

export function getBrandMenuHeaders() {
  return async (dispatch, getState) => {
    const accessToken = getAccessToken(getState())
    const sessionId = get(Cookies, 'gousto_session_id', false, false)
    const userId = getAuthUserId(getState())
    const { data: apiData } = await fetchBrandMenuHeaders(accessToken, sessionId, userId)

    if (!apiData) {
      logger.error({ message: 'Fetch Menu Headers failed'})

      return
    }

    const { data, included } = apiData
    const collectionHeaders = {
      collectionsPerMenu: data,
      headers: included
    }

    dispatch(menuCollectionsHeadersReceived(collectionHeaders))
  }
}
