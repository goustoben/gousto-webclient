import logger from 'utils/logger'
import { fetchBrandMenuHeaders } from 'apis/brand'
import { actionTypes } from '../../../actions/actionTypes'

export const menuCollectionsHeadersReceived = (collectionHeaders) => ({
  type: actionTypes.MENU_COLLECTIONS_HEADERS_RECEIVED,
  payload: {
    collectionHeaders
  }
})

export function getBrandMenuHeaders() {
  return async (dispatch) => {
    const { data: apiData } = await fetchBrandMenuHeaders()

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
