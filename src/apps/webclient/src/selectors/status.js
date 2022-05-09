import { actionTypes } from 'actions/actionTypes'

export const getBasketNotValidError = ({ error }) => error.get(actionTypes.BASKET_NOT_VALID, null)
export const getBasketSaveError = ({ error }) => error.get(actionTypes.BASKET_CHECKOUT)
export const getBasketSavePending = ({ pending }) => pending.get(actionTypes.BASKET_CHECKOUT)

export const getProductRecipePairingsPending = ({ pending }) => pending.get(actionTypes.PRODUCTS_RECIPE_PAIRINGS_RECIEVE, true)
export const getProductRecipePairingsError = ({ error }) => error.get(actionTypes.PRODUCTS_RECIPE_PAIRINGS_RECIEVE)
