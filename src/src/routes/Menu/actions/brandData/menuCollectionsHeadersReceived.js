import { actionTypes } from "actions/actionTypes"

export const menuCollectionsHeadersReceived = (collectionHeaders) => ({
    type: actionTypes.MENU_COLLECTIONS_HEADERS_RECEIVED,
    payload: {
        collectionHeaders
    }
})
