/* eslint-disable import/no-cycle */
import { actionTypes } from 'actions/actionTypes'
import { basketCheckedOut, basketCheckoutClicked, basketProceedToCheckout } from 'actions/basket'
import { boxSummaryVisibilityChange } from 'actions/boxSummary'
import { checkoutTransactionalOrder as checkoutTransactionalOrderV1 } from 'actions/checkout'
import { orderUpdate } from 'actions/order'
import status from 'actions/status'
import { sendUpdateOrder } from 'routes/Menu/actions/order'
import { getIsAuthenticated } from 'selectors/auth'

import { isBasketTransactionalOrder } from '../../../selectors/basket'
import { validateMenuLimitsForBasket } from '../selectors/menu'
import { checkoutTransactionalOrder } from './checkoutTransactionalOrder'

export const getIsSidesEnabled = async () => false
export const isOrderApiCreateEnabled = async () => true
export const isOrderApiUpdateEnabled = async () => false

export const checkoutBasket =
  ({ section, view, pricing }) =>
  async (dispatch, getState) => {
    const state = getState()
    const isAuthenticated = getIsAuthenticated(state)
    const isTransactionalOrder = isBasketTransactionalOrder(state)
    const rules = validateMenuLimitsForBasket(state)
    const transactionalOrderForNonLoggedInUser = isTransactionalOrder && !isAuthenticated

    dispatch(boxSummaryVisibilityChange(false))
    dispatch(basketCheckedOut({ view, pricing }))
    dispatch(basketCheckoutClicked(section))

    if (rules.length !== 0) {
      dispatch(
        status.error(actionTypes.BASKET_NOT_VALID, {
          errorTitle: 'Basket Not Valid',
          recipeId: null,
          rules,
        }),
      )

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
