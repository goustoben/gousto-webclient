import { createSelector } from 'reselect'

import { actionTypes } from 'actions/actionTypes'
export const getBasketNotValidError = ({ error }) => error.get(actionTypes.BASKET_NOT_VALID, null)

export const getPending = (state) => state.pending

export const createGetActionTypeIsPending = (actionType) =>
  createSelector(getPending, (pending) => pending.get(actionType))

export const getErrorSlice = (state) => state.error

export const createGetErrorForActionType = (actionType) =>
  createSelector(getErrorSlice, (errorSlice) => errorSlice.get(actionType, null))
