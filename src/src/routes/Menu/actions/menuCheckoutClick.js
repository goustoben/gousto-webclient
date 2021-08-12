/* eslint-disable import/no-cycle */
import { actionTypes } from 'actions/actionTypes'
import { basketCheckedOut, basketCheckoutClicked, basketProceedToCheckout } from 'actions/basket'
import { boxSummaryVisibilityChange } from 'actions/boxSummary'
import { checkoutTransactionalOrder as checkoutTransactionalOrderV1 } from 'actions/checkout'
import status from 'actions/status'
import { orderUpdate } from 'actions/order'
import { getIsAuthenticated } from 'selectors/auth'
import { isOptimizelyFeatureEnabledFactory } from 'containers/OptimizelyRollouts/index'
import { sendUpdateOrder } from 'routes/Menu/actions/order'
import { basketUpdateProducts } from 'routes/Menu/actions/basket'
import { checkoutTransactionalOrder } from './checkoutTransactionalOrder'
import { closeSidesModal } from './sides'
import { validateMenuLimitsForBasket } from '../selectors/menu'
import { isBasketTransactionalOrder } from '../../../selectors/basket'

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

  if (isUpdateV2Enabled) {
    dispatch(sendUpdateOrder())
  } else {
    dispatch(orderUpdate())
  }
}

// Products can be `null` if the products are never changes
// Otherwise it will be an object of ids and quantities
export const checkoutWithSides = (section, view, products) => async (dispatch, getState) => {
  const hasProducts = Boolean(products)

  dispatch(closeSidesModal())

  if (hasProducts) {
    await dispatch({
      type: actionTypes.SET_BASKET_PRODUCTS,
      products,
      trackingData: {
        actionType: actionTypes.SET_BASKET_PRODUCTS,
        productIds: Object.keys(products),
        section,
        view,
      },
    })

    const isUpdateV2Enabled = await isOrderApiUpdateEnabled(dispatch, getState)

    if (!isUpdateV2Enabled) {
      dispatch(basketUpdateProducts())
    }
  }

  dispatch(checkoutBasket(section, view))
}

export const clearBasketNotValidError = () => (dispatch) => {
  dispatch(status.error(actionTypes.BASKET_NOT_VALID, null))
}
