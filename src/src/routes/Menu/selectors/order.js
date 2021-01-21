import { getSlot, getDeliveryTariffId } from 'utils/deliveries'
import {
  getBasketDate,
  getBasketOrderId,
  getBasketRecipes,
  getBasketSlotId,
  getChosenAddressId,
  getNumPortions,
  getPromoCode
} from 'selectors/basket'
import { getNDDFeatureValue } from 'selectors/features'
import { createSelector } from 'reselect'
import { getBoxSummaryDeliveryDays } from 'selectors/root'

const getRecipes = createSelector([
  getBasketRecipes,
  getNumPortions,
], (recipes, quantity) => recipes.reduce((memo, recipeAmount, id) => [
  ...memo,
  ...Array.from(Array(recipeAmount).keys()).map(() =>
    ({
      id,
      quantity,
      type: 'Recipe',
    })
  )
], []))

export const getSlotForBoxSummaryDeliveryDays = createSelector([
  getBasketSlotId,
  getBasketDate,
  getBoxSummaryDeliveryDays,
], (slotId, date, boxSummaryDeliveryDays) => [getSlot(boxSummaryDeliveryDays, date, slotId), slotId])

export const getOrderDetails = createSelector([
  getSlotForBoxSummaryDeliveryDays,
  getRecipes,
  (state) => getDeliveryTariffId(state.user, getNDDFeatureValue(state)),
  getBasketDate,
  getBasketOrderId,
  getPromoCode,
  getChosenAddressId,
  getBoxSummaryDeliveryDays,
], ([slot], recipes, deliveryTariffId, date, orderId, promoCode, chosenAddressId, boxSummaryDeliveryDays) => {
  const deliverySlotId = slot.get('coreSlotId', '')
  const deliveryDayId = boxSummaryDeliveryDays && boxSummaryDeliveryDays.getIn([date, 'coreDayId'])
  const daySlotLeadTimeId = slot.get('daySlotLeadTimeId', '')

  return {
    delivery_day_id: deliveryDayId,
    delivery_slot_id: deliverySlotId,
    recipe_choices: recipes,
    day_slot_lead_time_id: daySlotLeadTimeId,
    delivery_tariff_id: deliveryTariffId,
    address_id: chosenAddressId,
    ...(orderId ? { order_id: orderId } : {}),
    ...(promoCode ? { promo_code: promoCode } : {})
  }
})

export const getCouldBasketBeExpired = createSelector(
  [getOrderDetails],
  (orderDetails) => !(orderDetails.delivery_day_id && orderDetails.delivery_slot_id && orderDetails.recipe_choices.length > 0)
)
