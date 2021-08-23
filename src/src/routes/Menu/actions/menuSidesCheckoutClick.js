/* eslint-disable import/no-cycle */
import { actionTypes } from 'actions/actionTypes'
import { closeSidesModal } from './sides'
import { checkoutBasket } from './menuCheckoutClick'

// Products can be `null` if the products are never changes
// Otherwise it will be an object of ids and quantities
export const checkoutWithSides = (section, view, products) => async (dispatch) => {
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
  }

  dispatch(checkoutBasket(section, view))
}
