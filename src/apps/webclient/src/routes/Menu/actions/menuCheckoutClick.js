/* eslint-disable import/no-cycle */
import { actionTypes } from 'actions/actionTypes'
import { basketCheckedOut, basketCheckoutClicked, basketProceedToCheckout } from 'actions/basket'
import { boxSummaryVisibilityChange } from 'actions/boxSummary'
import { checkoutTransactionalOrder as checkoutTransactionalOrderV1 } from 'actions/checkout'
import status from 'actions/status'
import { orderUpdate } from 'actions/order'
import { getIsAuthenticated } from 'selectors/auth'
import { isOptimizelyFeatureEnabledFactory } from 'containers/OptimizelyRollouts'
import { sendUpdateOrder } from 'routes/Menu/actions/order'
import { checkoutTransactionalOrder } from './checkoutTransactionalOrder'
import { validateMenuLimitsForBasket } from '../selectors/menu'
import { isBasketTransactionalOrder } from '../../../selectors/basket'

export const getIsSidesEnabled = isOptimizelyFeatureEnabledFactory('radishes_menu_api_recipe_agnostic_sides_mvp_web_enabled')

export const isOrderApiCreateEnabled = isOptimizelyFeatureEnabledFactory('radishes_order_api_create_web_enabled')

export const isOrderApiUpdateEnabled = isOptimizelyFeatureEnabledFactory('radishes_order_api_update_web_enabled')

export const checkoutBasket = (section, view) => async (dispatch, getState) => {
  const state = getState()
  const isAuthenticated = getIsAuthenticated(state)
  const isTransactionalOrder = isBasketTransactionalOrder(state)
  const rules = validateMenuLimitsForBasket(state)
  const transactionalOrderForNonLoggedInUser = isTransactionalOrder && !isAuthenticated

  dispatch(boxSummaryVisibilityChange(false))
  dispatch(basketCheckedOut(view))
  dispatch(basketCheckoutClicked(section))

  if (rules.length !== 0) {
    dispatch(status.error(actionTypes.BASKET_NOT_VALID, {
      errorTitle: 'Basket Not Valid',
      recipeId: null,
      rules
    }))

    return
  }

  if (transactionalOrderForNonLoggedInUser) {
    dispatch(basketProceedToCheckout())

    return
  }

  if (isTransactionalOrder) {
    const isCreateV2Enabled = await isOrderApiCreateEnabled(dispatch, getState)

    if (isCreateV2Enabled) {
      dispatch(checkoutTransactionalOrder())
    } else {
      dispatch(checkoutTransactionalOrderV1('create'))
    }

    return
  }

  const isUpdateV2Enabled = await isOrderApiUpdateEnabled(dispatch, getState)
  const isSidesEnabled = await getIsSidesEnabled(dispatch, getState)

  if (isUpdateV2Enabled) {
    dispatch(sendUpdateOrder(isSidesEnabled))
  } else {
    dispatch(orderUpdate(isSidesEnabled))
  }
}

export const clearBasketNotValidError = () => (dispatch) => {
  dispatch(status.error(actionTypes.BASKET_NOT_VALID, null))
}
