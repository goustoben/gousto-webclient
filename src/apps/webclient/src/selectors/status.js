import { createSelector } from 'reselect'

import { actionTypes } from 'actions/actionTypes'

export const getPending = (state) => state.pending

export const createGetActionTypeIsPending = (actionType, defaultValue = false) =>
  createSelector(getPending, (pending) => pending.get(actionType, defaultValue))

export const getErrorSlice = (state) => state.error

export const createGetErrorForActionType = (actionType) =>
  createSelector(getErrorSlice, (errorSlice) => errorSlice.get(actionType, null))

export const getUserLoginError = createGetErrorForActionType(actionTypes.USER_LOGIN)

export const getSignupLoginError = createGetErrorForActionType(actionTypes.CHECKOUT_SIGNUP_LOGIN)

export const getBasketNotValidError = createGetErrorForActionType(actionTypes.BASKET_NOT_VALID)

export const getBasketSaveError = createGetErrorForActionType(actionTypes.BASKET_CHECKOUT)

export const getBasketSavePending = createGetActionTypeIsPending(actionTypes.BASKET_CHECKOUT)

export const getProductRecipePairingsPending = createGetActionTypeIsPending(
  actionTypes.PRODUCTS_RECIPE_PAIRINGS_RECIEVE,
  true,
)

export const getProductRecipePairingsError = createGetErrorForActionType(
  actionTypes.PRODUCTS_RECIPE_PAIRINGS_RECIEVE,
)
