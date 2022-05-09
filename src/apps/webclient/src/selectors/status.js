import { createSelector } from 'reselect'

import { actionTypes } from 'actions/actionTypes'

export const getBasketNotValidError = ({ error }) => error.get(actionTypes.BASKET_NOT_VALID, null)

export const getPending = (state) => state.pending

export const createGetActionTypeIsPending = (actionType) =>
  createSelector(getPending, (pending) => pending.get(actionType))

export const getErrorSlice = (state) => state.error

export const createGetErrorForActionType = (actionType) =>
  createSelector(getErrorSlice, (errorSlice) => errorSlice.get(actionType, null))

export const getBasketSaveError = ({ error }) => error.get(actionTypes.BASKET_CHECKOUT)
export const getBasketSavePending = ({ pending }) => pending.get(actionTypes.BASKET_CHECKOUT)

export const getProductRecipePairingsPending = ({ pending }) =>
  pending.get(actionTypes.PRODUCTS_RECIPE_PAIRINGS_RECIEVE, true)
export const getProductRecipePairingsError = ({ error }) =>
  error.get(actionTypes.PRODUCTS_RECIPE_PAIRINGS_RECIEVE)
