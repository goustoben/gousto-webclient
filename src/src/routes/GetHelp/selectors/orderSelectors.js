import { actionTypes } from 'actions/actionTypes'
import { createSelector } from 'reselect'

export const getIsOrderValidationPending = ({ pending }) => (
  Boolean(pending.get(actionTypes.GET_HELP_VALIDATE_ORDER, null))
)

export const getOrderValidationError = ({ error }) => error.get(actionTypes.GET_HELP_VALIDATE_ORDER, null)

export const getIsOrderValidationError = createSelector(
  getOrderValidationError,
  (orderValidationError) => !!orderValidationError
)

export const getIneligibleIngredientsError = createSelector(
  getOrderValidationError,
  (error) => ((error && error.errors) ? error.errors.criteria : null)
)

export const getIsMultiComplaintLimitReachedLastFourWeeks = createSelector(
  getIneligibleIngredientsError,
  (errorCriteria) => Boolean(errorCriteria && errorCriteria.multiComplaintLimitReachedLastFourWeeks)
)

export const getIsBoxDailyComplaintLimitReached = createSelector(
  getIneligibleIngredientsError,
  (errorCriteria) => Boolean(errorCriteria && errorCriteria.boxDailyComplaintLimitReached)
)
