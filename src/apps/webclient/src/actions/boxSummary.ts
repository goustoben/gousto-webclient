import moment from 'moment'
import { push } from 'react-router-redux'
import { Dispatch } from 'redux'

import * as trackingKeys from 'actions/trackingKeys'
import { fetchDeliveryDays } from 'apis/deliveries'
import { getIsAuthenticated } from 'selectors/auth'
import { getBasketRecipes, getBasketPostcode, getBasketSlotId } from 'selectors/basket'
import { getNDDFeatureValue } from 'selectors/features'
import { getUsersOrdersDaySlotLeadTimeIds } from 'selectors/user'
import { okRecipes, basketSum } from 'utils/basket'
import {
  getAvailableDeliveryDays,
  getLandingDay,
  transformDaySlotLeadTimesToMockSlots,
  getDeliveryTariffId,
  getNDDFeatureFlagVal,
  getCutoffForFirstAvailableDate,
} from 'utils/deliveries'
import logger from 'utils/logger'

import { RemoveRecipeFn } from '../routes/Menu/domains/basket/index'
import { actionTypes } from './actionTypes'
import {
  basketAddressChange,
  basketDateChange,
  basketPostcodeChange,
  basketSlotChange,
} from './basket'
import { menuLoadMenu, menuLoadStock } from './menu'
import status from './status'

type State = any
type GetState = () => State

export const basketDeliveryDaysReceive = (days: any) => ({
  type: actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE,
  days,
})

export const boxSummaryDeliverySlotChosen =
  ({
    date,
    slotId,
    displayMenuForFirstWeekOnly,
  }: {
    date: any
    slotId: any
    displayMenuForFirstWeekOnly?: any
  }) =>
  async (dispatch: Dispatch<any>, getState: GetState) => {
    dispatch(status.pending(actionTypes.MENU_FETCH_DATA, true))
    dispatch(basketDateChange(date))
    dispatch(basketSlotChange(slotId))

    const cutoffDateTime = displayMenuForFirstWeekOnly
      ? getCutoffForFirstAvailableDate(getState())
      : null
    await Promise.all([dispatch(menuLoadMenu(cutoffDateTime)), dispatch(menuLoadStock())])
    dispatch(status.pending(actionTypes.MENU_FETCH_DATA, false))
  }

export const boxSummaryVisibilityChange =
  (show: boolean, removeRecipe: RemoveRecipeFn) =>
  (dispatch: Dispatch<any>, getState: GetState) => {
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
        },
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
      const okRecipeIds = okRecipes(
        basketRecipes,
        state.menuRecipes,
        state.menuRecipeStock,
        state.basket.get('numPortions'),
      )
      basketRecipes
        .filter((amount: any, recipeId: string) => !okRecipeIds.has(recipeId))
        .forEach((amount: any, recipeId: string) => {
          for (let x = 0; x < amount; x++) {
            removeRecipe(recipeId)
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

        dispatch(
          boxSummaryDeliverySlotChosen({
            date: tempDate,
            slotId: tempSlotId,
            displayMenuForFirstWeekOnly: undefined,
          }),
        )
      }
    }
  }

export const boxSummaryDeliveryDaysLoad =
  (cutoffDatetimeFrom?: any, cutoffDatetimeUntil?: any) =>
  async (dispatch: Dispatch<any>, getState: GetState) => {
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
      const cutoffDatetimeFromFormatted = moment
        .utc(cutoffDatetimeFrom)
        .startOf('day')
        .toISOString()
      const deliveryTariffId = getDeliveryTariffId(user, getNDDFeatureValue(state))
      let { data: days } = await fetchDeliveryDays(
        accessToken,
        cutoffDatetimeFromFormatted,
        cutoffUntil,
        isNDDExperiment,
        deliveryTariffId,
        postcode,
      )

      if (isNDDExperiment) {
        days = transformDaySlotLeadTimesToMockSlots(days)
      }

      const availableDeliveryDays = getAvailableDeliveryDays(
        days,
        cutoffDatetimeFrom,
        getUsersOrdersDaySlotLeadTimeIds(state),
      )

      dispatch(basketDeliveryDaysReceive(availableDeliveryDays))
    } catch (err: any) {
      if (err.message !== 'do-not-deliver') {
        ;(logger as any).error(err)
      }

      dispatch(status.error(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE, err.message))
    }
  }

export const boxSummaryNext =
  (removeRecipe: RemoveRecipeFn) => (dispatch: Dispatch<any>, getState: GetState) => {
    const state = getState()
    const landing = getLandingDay(state, { useCurrentSlot: true })

    const tempDate = state.temp.get('date', landing.date)
    const tempSlotId = state.temp.get('slotId', landing.slotId)
    const tempOrderId = state.temp.get('orderId')

    const basketPostcode = state.basket.get('postcode')

    if (basketPostcode && !state.error.get(actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE)) {
      if (tempOrderId) {
        dispatch(push(`/menu/${tempOrderId}`))
        dispatch(boxSummaryVisibilityChange(false, removeRecipe))
      } else {
        dispatch(
          boxSummaryDeliverySlotChosen({
            date: tempDate,
            slotId: tempSlotId,
            displayMenuForFirstWeekOnly: undefined,
          }),
        )
        if (getBasketRecipes(state).size === 0) {
          dispatch(boxSummaryVisibilityChange(false, removeRecipe))
        }
      }
    } else {
      const tempPostcode = state.temp.get('postcode', '')
      let shippingDefault
      if (state.user.get('shippingAddresses')) {
        shippingDefault = state.user
          .get('shippingAddresses')
          .filter((address: any) => address.get('shippingDefault'))
          .first()
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

export const trackingUnavailableRecipeList = (unavailableRecipeList: any) => ({
  type: actionTypes.TRACKING_UNAVAILABLE_RECIPE_LIST,
  trackingData: {
    actionType: trackingKeys.unavailableRecipeList,
    unavailableRecipeList: unavailableRecipeList.keySeq().toArray(),
  },
})
