import { actionTypes } from 'actions/actionTypes'
import { createSelector } from 'reselect'

export const getOrderValidationPendingState = ({ pending }) => (
  Boolean(pending.get(actionTypes.GET_HELP_VALIDATE_ORDER, null))
)

export const getOrderValidationError = ({ error }) => error.get('GET_HELP_VALIDATE_ORDER', '')

export const getUserOrdersForGetHelp = ({ getHelp }) => (
  getHelp.get('orders')
)

export const getDaysSinceLastCompensation = createSelector(
  getOrderValidationError,
  ({ errors }) => {
    if (errors && errors.criteria) {
      const { daysSinceLastCompensation } = errors.criteria

      return daysSinceLastCompensation
    }

    return -1
  }
)

export const getRecipesForGetHelp = state => state.getHelp.get('recipes').toJS()

export const getOrderId = state => state.getHelp.get('order').get('id')
