import { getBasketOrderId, getBasketTariffId, getPromoCode } from 'selectors/basket'
import { shouldUseWizardPricePerServing } from 'selectors/menu'
import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from 'actions/actionTypes'
import GoustoException from 'utils/GoustoException'
import logger from 'utils/logger'
import { setLowestPricePerPortion } from 'actions/boxPricesPricePerPortion/setLowestPricePerPortion'
import { menuReceiveBoxPrices } from "actions/menu/menuReceiveBoxPrices"
import { fetchBoxPrices } from "apis/boxPrices/fetchBoxPrices"

export function menuLoadBoxPrices() {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const promoCode = getPromoCode(state)
      const orderId = getBasketOrderId(state)
      const tariffId = getBasketTariffId(state)
      const reqData = {}
      const useWizardPricePerServing = shouldUseWizardPricePerServing(state)

      if (orderId) {
        reqData.order_id = orderId
      } else if (promoCode) {
        reqData.promocode = promoCode
      }

      if (!getState().auth.get('isAuthenticated') && tariffId) {
        reqData.tariff_id = tariffId
      }

      dispatch(pending(actionTypes.MENU_BOX_PRICES_RECEIVE, true))
      dispatch(error(actionTypes.MENU_BOX_PRICES_RECEIVE, false))

      try {
        const {data: recipePrices} = await fetchBoxPrices(getState().auth.get('accessToken'), reqData)
        dispatch(menuReceiveBoxPrices(recipePrices, tariffId))
        if (useWizardPricePerServing) {
          dispatch(setLowestPricePerPortion(recipePrices))
        }
      } catch (err) {
        dispatch(menuReceiveBoxPrices({}))

        throw new GoustoException(`Could not load menu box prices: fetch failed${tariffId ? ` for tariff_id "${tariffId}"` : ''}, ${err}`, {
          error: 'fetch-failed',
        })
      }
    } catch (err) {
      const errMessage = err.message || err
      logger[err.level || 'error'](errMessage)
      dispatch(error(actionTypes.MENU_BOX_PRICES_RECEIVE, err.error || errMessage))
    } finally {
      dispatch(pending(actionTypes.MENU_BOX_PRICES_RECEIVE, false))
    }
  }
}
