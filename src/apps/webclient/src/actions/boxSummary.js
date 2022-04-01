import { fetchDeliveryDays } from 'apis/deliveries'
import { getBasketRecipes, getBasketPostcode, getBasketSlotId } from 'selectors/basket'
import { getNDDFeatureValue } from 'selectors/features'
import { getUsersOrdersDaySlotLeadTimeIds } from 'selectors/user'
import { getIsAuthenticated } from 'selectors/auth'
import moment from 'moment'
import { okRecipes, basketSum } from 'utils/basket'
import logger from 'utils/logger'
import { push } from 'react-router-redux'
import { getAvailableDeliveryDays, getLandingDay, transformDaySlotLeadTimesToMockSlots, getDeliveryTariffId, getNDDFeatureFlagVal, getCutoffForFirstAvailableDate } from 'utils/deliveries'
import * as trackingKeys from 'actions/trackingKeys'
import { basketRecipeRemove } from 'routes/Menu/actions/basketRecipes'
import status from './status'
import { menuLoadMenu, menuLoadStock } from './menu'
import {
  basketAddressChange,
  basketDateChange,
  basketPostcodeChange,
  basketSlotChange,
} from './basket'
import { actionTypes } from './actionTypes'

export const basketDeliveryDaysReceive = (days) => ({
  type: actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE,
  days,
})

export const boxSummaryDeliverySlotChosen = ({ date, slotId, displayMenuForFirstWeekOnly }) => (
  async (dispatch, getState) => {
    dispatch(status.pending(actionTypes.MENU_FETCH_DATA, true))
    dispatch(basketDateChange(date))
    dispatch(basketSlotChange(slotId))

    const cutoffDateTime = displayMenuForFirstWeekOnly ? getCutoffForFirstAvailableDate(getState()) : null

    await Promise.all([
      dispatch(menuLoadMenu(cutoffDateTime)),
      dispatch(menuLoadStock()),
    ])
    dispatch(status.pending(actionTypes.MENU_FETCH_DATA, false))
  }
)

export const boxSummaryVisibilityChange = (show) => (
  (dispatch, getState) => {
    const state = getState()
    const basketRecipes = state.basket.get('recipes')
    const amountOfRecipesInBasket = basketSum(basketRecipes)
    if (show) {
      const type = trackingKeys.clickViewBasket
      dispatch({
        type,
        trackingData: {
          actionType: type,
          recipes_added: amountOfRecipesInBasket,
        }
      })
    }

    dispatch({
      type: actionTypes.BOXSUMMARY_VISIBILITY_CHANGE,
      show,
      trackingData: {
        actionType: trackingKeys.changeBoxSummaryVisibility,
        show,
        recipes_added: amountOfRecipesInBasket,
      },
    })
    if (!show) {
      const okRecipeIds = okRecipes(basketRecipes, state.menuRecipes, state.menuRecipeStock, state.basket.get('numPortions'))
      basketRecipes
        .filter((amount, recipeId) => !okRecipeIds.has(recipeId))
        .forEach((amount, recipeId) => {
          for (let x = 0; x < amount; x++) {
            dispatch(basketRecipeRemove(recipeId))
          }
        })
    }

    const isAuthenticated = getIsAuthenticated(state)
    if (!show && !isAuthenticated) {
      // When closing by a cross on the "delivery slot" step, proceed as though
      // on CTA click, i.e. confirm the slot selected by default as chosen.
      const basketPostcode = getBasketPostcode(state)
      const basketSlotId = getBasketSlotId(state)
      if (basketPostcode && !basketSlotId) {
        const landing = getLandingDay(state, { useCurrentSlot: true })

        const tempDate = state.temp.get('date', landing.date)
        const tempSlotId = state.temp.get('slotId', landing.slotId)

        dispatch(boxSummaryDeliverySlotChosen({ date: tempDate, slotId: tempSlotId }))
      }
    }
  }
)

export const boxSummaryDeliveryDaysLoad = (cutoffDatetimeFrom, cutoffDatetimeUntil) => (
  async (dispatch, getState) => {
    const state = getState()
    const { auth, basket, menuCutoffUntil, user } = state

    dispatch(status.error(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE, false))

    const postcode = basket.get('postcode') || null
    const cutoffUntil = cutoffDatetimeUntil
      ? moment.utc(cutoffDatetimeUntil).endOf('day').toISOString()
      : menuCutoffUntil

    const isNDDExperiment = getNDDFeatureFlagVal(getState())

    try {
      const accessToken = auth.get('accessToken')
      const cutoffDatetimeFromFormatted = moment.utc(cutoffDatetimeFrom).startOf('day').toISOString()
      const deliveryTariffId = getDeliveryTariffId(user, getNDDFeatureValue(state))
      let { data: days } = await fetchDeliveryDays(accessToken, cutoffDatetimeFromFormatted, cutoffUntil, isNDDExperiment, deliveryTariffId, postcode)

      if (isNDDExperiment) {
        days = transformDaySlotLeadTimesToMockSlots(days)
      }

      const availableDeliveryDays = getAvailableDeliveryDays(days, cutoffDatetimeFrom, getUsersOrdersDaySlotLeadTimeIds(state))

      dispatch(basketDeliveryDaysReceive(availableDeliveryDays))
    } catch (err) {
      if (err.message !== 'do-not-deliver') {
        logger.error(err)
      }

      dispatch(status.error(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE, err.message))
    }
  }
)

export const boxSummaryNext = () => (
  (dispatch, getState) => {
    const state = getState()
    const landing = getLandingDay(state, { useCurrentSlot: true })

    const tempDate = state.temp.get('date', landing.date)
    const tempSlotId = state.temp.get('slotId', landing.slotId)
    const tempOrderId = state.temp.get('orderId')

    const basketPostcode = state.basket.get('postcode')

    if (basketPostcode && !state.error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE)) {
      if (tempOrderId) {
        dispatch(push(`/menu/${tempOrderId}`))
        dispatch(boxSummaryVisibilityChange(false))
      } else {
        dispatch(boxSummaryDeliverySlotChosen({ date: tempDate, slotId: tempSlotId }))
        if (getBasketRecipes(state).size === 0) {
          dispatch(boxSummaryVisibilityChange(false))
        }
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
)

export const trackingUnavailableRecipeList = (unavailableRecipeList) => ({
  type: actionTypes.TRACKING_UNAVAILABLE_RECIPE_LIST,
  trackingData: {
    actionType: trackingKeys.unavailableRecipeList,
    unavailableRecipeList: unavailableRecipeList.keySeq().toArray()
  }
})
