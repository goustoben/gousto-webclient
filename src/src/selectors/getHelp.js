import { actionTypes } from 'actions/actionTypes'

export const getOrderValidationPendingState = ({ pending }) => (
  Boolean(pending.get(actionTypes.GET_HELP_VALIDATE_ORDER, null))
)

export const getRecipesForGetHelp = state => state.getHelp.get('recipes').toJS()
