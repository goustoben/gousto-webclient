import { actionTypes } from "actions/actionTypes"

export const basketSignupCollectionReceive = collection => ({
  type: actionTypes.BASKET_SIGNUP_COLLECTION_RECEIVE,
  collection,
})
