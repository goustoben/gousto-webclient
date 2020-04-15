import { actionTypes } from 'actions/actionTypes'
export const getBasketNotValidError = ({ error }) => error.get(actionTypes.BASKET_NOT_VALID, null)
