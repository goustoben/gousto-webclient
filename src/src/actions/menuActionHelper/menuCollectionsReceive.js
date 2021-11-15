import { actionTypes } from "actions/actionTypes"

export function menuCollectionsReceive(collections) {
    return {
        type: actionTypes.MENU_COLLECTIONS_RECEIVE,
        collections,
    }
}
