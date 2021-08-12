import { actionTypes } from 'actions/actionTypes'
import { createSelector } from 'reselect'

export const getOrderValidationPendingState = ({ pending }) => (
  Boolean(pending.get(actionTypes.GET_HELP_VALIDATE_ORDER, null))
)

export const getOrderValidationError = ({ error }) => error.get('GET_HELP_VALIDATE_ORDER', '')

export const getUserOrdersForGetHelp = ({ getHelp }) => (
  getHelp.get('orders')
)

export const getIsOrderValidationError = createSelector(
  getOrderValidationError,
  (orderValidationError) => !!orderValidationError
)
