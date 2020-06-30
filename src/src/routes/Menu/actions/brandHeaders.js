import logger from 'utils/logger'
import { getAccessToken } from 'selectors/auth'
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
    const { data: apiData } = await fetchBrandMenuHeaders(accessToken)

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
