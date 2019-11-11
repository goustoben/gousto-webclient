import { getDeliveryDays } from 'apis/data/deliveryDays'
import { getNDDFeatureValue } from 'selectors/features'
import moment from 'moment'
import { okRecipes } from 'utils/basket'
import logger from 'utils/logger'
import { push } from 'react-router-redux'
import { getAvailableDeliveryDays, getLandingDay, transformDaySlotLeadTimesToMockSlots, getDeliveryTariffId, getNDDFeatureFlagVal } from 'utils/deliveries'
import { addDisabledSlotIds } from 'BoxSummary/DeliverySlot/deliverySlotHelper'
import status from './status'
import { menuLoadMenu, menuLoadStock } from './menu'
import {
  basketAddressChange,
  basketDateChange,
  basketPostcodeChange,
  basketRecipeRemove,
  basketSlotChange,
  portionSizeSelectedTracking
} from './basket'
import actionTypes from './actionTypes'

function basketDeliveryDaysReceive(days) {
  return {
    type: actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE,
    days,
  }
}

const boxSummaryDeliverySlotChosen = ({ date, slotId }) => (
  async (dispatch) => {
    dispatch(status.pending(actionTypes.MENU_FETCH_DATA, true))
    dispatch(basketDateChange(date))
    dispatch(basketSlotChange(slotId))
    await Promise.all([
      dispatch(menuLoadMenu()),
      dispatch(menuLoadStock()),
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
            dispatch(basketRecipeRemove(recipeId))
          }
        })
    }
  }
)

const actions = {
  boxSummaryVisibilityChange,

  boxSummaryDeliverySlotChosen,

  boxSummaryDeliveryDaysLoad: (cutoffDatetimeFrom, cutoffDatetimeUntil) => (
    async (dispatch, getState) => {
      dispatch(status.error(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE, false))

      const postcode = getState().basket.get('postcode') || null
      const cutoffUntil = cutoffDatetimeUntil
        ? moment.utc(cutoffDatetimeUntil).endOf('day').toISOString()
        : getState().menuCutoffUntil

      const isNDDExperiment = getNDDFeatureFlagVal(getState())

      try {
        let days = await getDeliveryDays(
          getState().auth.get('accessToken'),
          postcode,
          moment.utc(cutoffDatetimeFrom).startOf('day').toISOString(),
          cutoffUntil,
          isNDDExperiment,
          getDeliveryTariffId(getState().user, getNDDFeatureValue(getState())),
        )

        if (isNDDExperiment) {
          days = transformDaySlotLeadTimesToMockSlots(days)
        }

        const userOrdersDaySlotLeadTimeIds = getState().user.get('orders').map(order => order.get('daySlotLeadTimeId')).toArray()
        const availableDeliveryDays = getAvailableDeliveryDays(days, cutoffDatetimeFrom, userOrdersDaySlotLeadTimeIds)

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
      const deliveryDays = addDisabledSlotIds(state.boxSummaryDeliveryDays)
      const landing = getLandingDay(
        state,
        true,
        !canLandOnOrder,
        deliveryDays
      )

      const tempDate = state.temp.get('date', landing.date)
      const tempSlotId = state.temp.get('slotId', landing.slotId)
      const tempOrderId = state.temp.get('orderId', landing.orderId)

      const basketPostcode = state.basket.get('postcode')

      if (basketPostcode && !state.error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE)) {
        dispatch(portionSizeSelectedTracking(numPortions))
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
          dispatch(basketAddressChange(chosenAddress))
          dispatch(basketPostcodeChange(chosenAddress.get('postcode')))
        } else if (tempPostcode && tempPostcode.trim() !== '') {
          const postcode = state.temp.get('postcode')
          dispatch(basketPostcodeChange(postcode))
        }
      }
    }
  ),
}

export default actions
