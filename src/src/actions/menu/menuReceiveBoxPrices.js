import { actionTypes } from "actions/actionTypes"

export function menuReceiveBoxPrices(prices, tariffId) {
  return ({
    type: actionTypes.MENU_BOX_PRICES_RECEIVE,
    prices,
    tariffId,
  })
}
