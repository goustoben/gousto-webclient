import actionTypes from './actionTypes'
import basket from './basket'
import menu from './menu'
import status from './status'
import { fetchDeliveryDays } from 'apis/deliveries'
import moment from 'moment'
import { okRecipes } from 'utils/basket'
import logger from 'utils/logger'
import { push } from 'react-router-redux'
import * as deliveryUtils from 'utils/deliveries'
import { formatDateAndSlot } from 'BoxSummary/DeliverySlot/deliverySlotHelper'

function basketDeliveryDaysReceive(days) {
  return {
    type: actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE,
    days,
  }
}

const boxSummaryDeliverySlotChosen = ({ date, slotId }) => (
  async (dispatch) => {
    dispatch(status.pending(actionTypes.MENU_FETCH_DATA, true))
    dispatch(basket.basketDateChange(date))
    dispatch(basket.basketSlotChange(slotId))
    await Promise.all([
      dispatch(menu.menuLoadMenu()),
      dispatch(menu.menuLoadStock()),
    ])
    dispatch(status.pending(actionTypes.MENU_FETCH_DATA, false))
  }
)

const boxSummaryVisibilityChange = (show, view) => (
  (dispatch, getState) => {
    dispatch({
      type: actionTypes.BOXSUMMARY_VISIBILITY_CHANGE,
      show,
      view,
      trackingData: {
        actionType: actionTypes.BOXSUMMARY_VISIBILITY_CHANGE,
        show,
        view,
      },
    })
    if (!show) {
      const state = getState()
      const recipes = state.basket.get('recipes')
      const okRecipeIds = okRecipes(recipes, state.menuRecipes, state.menuRecipeStock, state.basket.get('numPortions'))
      recipes
        .filter((amount, recipeId) => !okRecipeIds.has(recipeId))
        .forEach((amount, recipeId) => {
          for (let x = 0; x < amount; x++) {
            dispatch(basket.basketRecipeRemove(recipeId))
          }
        })
    }
  }
)

export default {
  boxSummaryVisibilityChange,

  boxSummaryDeliverySlotChosen,

  boxSummaryDeliveryDaysLoad: (cutoffDatetimeFrom, cutoffDatetimeUntil) => (
    async (dispatch, getState) => {
      dispatch(status.error(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE, false))

      const postcode = getState().basket.get('postcode')
      const cutoffUntil = cutoffDatetimeUntil
        ? moment.utc(cutoffDatetimeUntil).endOf('day').toISOString()
        : getState().menuCutoffUntil
      const reqData = {
        'filters[cutoff_datetime_from]': moment.utc(cutoffDatetimeFrom).startOf('day').toISOString(),
        'filters[cutoff_datetime_until]': cutoffUntil,
        sort: 'date',
        direction: 'asc',
      }
      if (postcode) {
        reqData.postcode = postcode
      }
      const accessToken = getState().auth.get('accessToken')
      try {
        const { data: days } = await fetchDeliveryDays(accessToken, reqData)
        const availableDeliveryDays = deliveryUtils.getAvailableDeliveryDays(days, cutoffDatetimeFrom)

        dispatch(basketDeliveryDaysReceive(availableDeliveryDays))
      } catch (err) {
        if (err.message !== 'do-not-deliver') {
          logger.error(err)
        }

        dispatch(status.error(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE, err.message))
      }
    }
  ),

  boxSummaryNext: (numPortions) => (
    (dispatch, getState) => {
      const state = getState()
      const canLandOnOrder = state.features.getIn(['landingOrder', 'value'], false)
      const deliveryDaysWithBlockedSlots = formatDateAndSlot(state.boxSummaryDeliveryDays)
      const landing = deliveryUtils.getLandingDay(
        state,
        true,
        !canLandOnOrder,
        deliveryDaysWithBlockedSlots
      )

      const tempDate = state.temp.get('date', landing.date)
      const tempSlotId = state.temp.get('slotId', landing.slotId)
      const tempOrderId = state.temp.get('orderId', landing.orderId)

      const basketPostcode = state.basket.get('postcode')

      if (basketPostcode && !state.error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE)) {
        dispatch(basket.portionSizeSelectedTracking(numPortions))
        if (tempOrderId) {
          dispatch(push(`/menu/${tempOrderId}`))
          dispatch(boxSummaryVisibilityChange(false))
        } else {
          dispatch(boxSummaryDeliverySlotChosen({ date: tempDate, slotId: tempSlotId }))
        }
      } else {
        const tempPostcode = state.temp.get('postcode', '')
        let shippingDefault
        if (state.user.get('shippingAddresses')) {
          shippingDefault = state.user.get('shippingAddresses').filter(address => address.get('shippingDefault')).first()
        }

        const chosenAddress = state.basket.get('chosenAddress') || shippingDefault

        if (chosenAddress) {
          dispatch(basket.basketAddressChange(chosenAddress))
          dispatch(basket.basketPostcodeChange(chosenAddress.get('postcode')))
        } else if (tempPostcode && tempPostcode.trim() !== '') {
          const postcode = state.temp.get('postcode')
          dispatch(basket.basketPostcodeChange(postcode))
        }
      }
    }
  ),
}
