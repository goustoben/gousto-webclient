import { actionTypes } from 'actions/actionTypes'
import { basketCheckedOut, basketCheckoutClicked, basketProceedToCheckout } from 'actions/basket'
import { boxSummaryVisibilityChange } from 'actions/boxSummary'
import { checkoutTransactionalOrder as checkoutTransactionalOrderV1 } from 'actions/checkout'
import status from 'actions/status'
import { orderUpdate } from 'actions/order'
import { getIsAuthenticated } from 'selectors/auth'
import { isOptimizelyFeatureEnabledFactory } from 'containers/OptimizelyRollouts/index'
import { sendUpdateOrder } from 'routes/Menu/actions/order'
import { checkoutTransactionalOrder } from './checkoutTransactionalOrder'
import { validateMenuLimitsForBasket } from '../selectors/menu'
import { getBasketOrderId } from '../../../selectors/basket'

export const isOrderApiCreateEnabled = isOptimizelyFeatureEnabledFactory('radishes_order_api_create_web_enabled')

export const isOrderApiUpdateEnabled = isOptimizelyFeatureEnabledFactory('radishes_order_api_update_web_enabled')

export const checkoutBasket = (section, view) => async (dispatch, getState) => {
  const state = getState()
  const isAuthenticated = getIsAuthenticated(state)
  const orderId = getBasketOrderId(state)
  const rules = validateMenuLimitsForBasket(state)

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

  if (!orderId && !isAuthenticated) {
    dispatch(basketProceedToCheckout())

    return
  }

  if (!orderId) {
    const isCreateV2Enabled = await isOrderApiCreateEnabled(dispatch, getState)

    if (isCreateV2Enabled) {
      dispatch(checkoutTransactionalOrder())
    } else {
      dispatch(checkoutTransactionalOrderV1('create'))
    }

    return
  }

  const isUpdateV2Enabled = await isOrderApiUpdateEnabled(dispatch, getState)

  if (isUpdateV2Enabled) {
    dispatch(sendUpdateOrder())
  } else {
    dispatch(orderUpdate())
  }
}

export const clearBasketNotValidError = () => (dispatch) => {
  dispatch(status.error(actionTypes.BASKET_NOT_VALID, null))
}
