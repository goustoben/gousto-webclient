/* eslint-disable import/no-cycle */
import { actionTypes } from 'actions/actionTypes'
import { getBasketOrderId } from 'selectors/basket'
import { orderConfirmationRedirect } from 'actions/orderConfirmation'
import { getOrderAction } from '../selectors/order'
import { closeSidesModal } from './sides'

// Products can be `null` if the products are never changes
// Otherwise it will be an object of ids and quantities
export const checkoutWithSides = (section, view, products) => async (dispatch, getState) => {
  const state = getState()
  const hasProducts = Boolean(products)
  const orderId = getBasketOrderId(state)
  const orderAction = getOrderAction(state)

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
  }

  dispatch(closeSidesModal())
  dispatch(orderConfirmationRedirect(orderId, orderAction))
}
