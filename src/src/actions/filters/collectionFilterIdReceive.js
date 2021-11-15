import { actionTypes } from "actions/actionTypes"

export const collectionFilterIdReceive = (collectionId) => ({
  type: actionTypes.FILTERS_COLLECTION_CHANGE,
  collectionId,
})
