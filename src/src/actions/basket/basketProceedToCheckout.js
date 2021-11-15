import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"
import { push } from "react-router-redux"
import logger from "utils/logger"
import { error } from 'actions/status/error'
import { pending } from 'actions/status/pending'
import { client } from "config/routes"

export const basketProceedToCheckout = () => (
  async (dispatch, getState) => {
    const {basket} = getState()
    dispatch({
      type: actionTypes.BASKET_CHECKOUT_PROCEED,
      trackingData: {
        actionType: trackingKeys.checkOutBasketComplete,
        basket,
      },
    })

    dispatch(pending(actionTypes.BASKET_CHECKOUT, true))
    dispatch(error(actionTypes.BASKET_CHECKOUT, false))

    try {
      dispatch(push(client['check-out']))
    } catch (err) {
      logger.error(err)
      dispatch(push(client.menu))
      dispatch(error(actionTypes.BASKET_CHECKOUT, err.message))
    } finally {
      dispatch(pending(actionTypes.BASKET_CHECKOUT, false))
    }
  }
)
