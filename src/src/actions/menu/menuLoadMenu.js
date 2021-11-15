import { getCutoffDateTime } from "utils/deliveries"
import logger from "utils/logger"
import { limitReached } from "utils/basket"
import { actionTypes } from "actions/actionTypes"
import { unset } from "utils/cookieHelper2"
import Cookies from "utils/GoustoCookies"
import { isFacebookUserAgent } from "utils/request"
import { reloadPageWhenInvalidDeliveryDate } from "actions/menu/reloadPageWhenInvalidDeliveryDate"
import { menuReceiveMenuPending } from "actions/menu/menuReceiveMenuPending"
import { loadMenuCollectionsWithMenuService } from "actions/menuActionHelper/loadMenuCollectionsWithMenuService"
import { redirect } from "actions/redirect/redirect"

export function menuLoadMenu(cutoffDateTime = null, background) {
  return async (dispatch, getState) => {
    const state = getState()
    const reqData = {
      'includes[]': ['ingredients', 'allergens'],
    }
    dispatch(menuReceiveMenuPending(true))
    if (cutoffDateTime !== null) {
      reqData['filters[available_on]'] = cutoffDateTime
    } else {
      reqData['filters[available_on]'] = getCutoffDateTime(getState())
    }

    if (reqData['filters[available_on]']) {
      const date = reqData['filters[available_on]']
      const startTime = new Date()

      await loadMenuCollectionsWithMenuService(dispatch, getState, date, background)

      logger.notice(`recipes fetch took ${new Date() - startTime}ms`)

      dispatch(menuReceiveMenuPending(false))

      const reachedLimit = limitReached(state.basket, state.menuRecipes, state.menuRecipeStock)
      dispatch({
        type: actionTypes.BASKET_LIMIT_REACHED,
        limitReached: reachedLimit,
      })
      if (!__SERVER__) {
        unset(Cookies, 'reload_invalid_delivery_date')
      }
    } else {
      dispatch(menuReceiveMenuPending(false))
      if (!__SERVER__ || !isFacebookUserAgent(state.request.get('userAgent'))) {
        const error = new Error('Slot is not found in menuLoadMenu')
        logger.error({message: error.message, extra: {error}})
      }

      if (__SERVER__) {
        dispatch(redirect('/menu', true))

        return
      }

      reloadPageWhenInvalidDeliveryDate({dispatch, getState})
    }
  }
}
