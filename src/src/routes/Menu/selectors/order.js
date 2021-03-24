import { getSlot, getDeliveryTariffId } from 'utils/deliveries'
import {
  getBasketDate,
  getBasketOrderId,
  getBasketProducts,
  getBasketRecipes,
  getBasketSlotId,
  getChosenAddressId,
  getNumPortions,
  getPromoCode
} from 'selectors/basket'
import { getNDDFeatureValue } from 'selectors/features'
import { createSelector } from 'reselect'
import { getBoxSummaryDeliveryDays } from 'selectors/root'
import { getUserOrders } from 'selectors/user'
import { ResourceType } from '../constants/resources'

const getRecipesV1 = createSelector([
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

const getOrderDetailsForBasket = createSelector([
  getSlotForBoxSummaryDeliveryDays,
  getBasketDate,
  getChosenAddressId,
  getBoxSummaryDeliveryDays,
], ([slot], date, shippingAddressId, boxSummaryDeliveryDays) => {
  const deliverySlotId = slot.get('coreSlotId', '')
  const deliveryDayId = boxSummaryDeliveryDays && boxSummaryDeliveryDays.getIn([date, 'coreDayId'])
  const deliverySlotLeadTimeId = slot.get('daySlotLeadTimeId', '')

  return {
    deliveryDayId,
    deliverySlotId,
    deliverySlotLeadTimeId,
    shippingAddressId,
  }
})

export const getUserDeliveryTariffId = (state) => getDeliveryTariffId(state.user, getNDDFeatureValue(state))

export const getOrderDetails = createSelector([
  getOrderDetailsForBasket,
  getRecipesV1,
  getUserDeliveryTariffId,
  getBasketOrderId,
  getPromoCode,
], (orderDetails, recipes, deliveryTariffId, orderId, promoCode) => {
  const {
    deliveryDayId,
    deliverySlotId,
    shippingAddressId,
    deliverySlotLeadTimeId,
  } = orderDetails

  return {
    delivery_day_id: deliveryDayId,
    delivery_slot_id: deliverySlotId,
    recipe_choices: recipes,
    day_slot_lead_time_id: deliverySlotLeadTimeId,
    address_id: shippingAddressId,
    delivery_tariff_id: deliveryTariffId,
    ...(orderId ? { order_id: orderId } : {}),
    ...(promoCode ? { promo_code: promoCode } : {})
  }
})

export const getCouldBasketBeExpired = createSelector(
  [getOrderDetailsForBasket, getBasketRecipes],
  ({ deliveryDayId, deliverySlotId }, recipes) => !(deliveryDayId && deliverySlotId && recipes.size > 0)
)

export const getOrderAction = createSelector([
  getUserOrders,
  getBasketOrderId,
], (userOrders, orderId) => {
  const userOrder = userOrders.find(order => order.get('id') === orderId)
  const recipeAction = (userOrder && userOrder.get('recipeItems').size > 0) ? 'update' : 'choice'
  const orderAction = orderId ? `recipe-${recipeAction}` : 'create'

  return orderAction
})

export const getOrderForUpdateOrderV1 = createSelector([
  getOrderDetailsForBasket,
  getRecipesV1,
  getOrderAction,
], (orderDetails, recipes, orderAction) => {
  const {
    deliveryDayId,
    deliverySlotId,
    shippingAddressId,
    deliverySlotLeadTimeId,
  } = orderDetails

  return {
    delivery_day_id: deliveryDayId,
    delivery_slot_id: deliverySlotId,
    recipe_choices: recipes,
    day_slot_lead_time_id: deliverySlotLeadTimeId,
    address_id: shippingAddressId,
    order_action: orderAction,
  }
})

const getRecipesV2 = createSelector([
  // menuService is not an ImmutableJS Object
  (state) => state.menuService.recipe,
  getBasketRecipes,
  getNumPortions,
], (recipes, basketRecipes, quantity) => basketRecipes.reduce((memo, recipeAmount, id) => [
  ...memo,
  ...Array.from(Array(recipeAmount).keys()).map(() => ({
    id: recipes[id].id,
    type: 'recipe',
    meta: {
      portion_for: quantity,
    },
  })
  )
], []))

export const getOrderV2 = createSelector([
  getOrderDetailsForBasket,
  getRecipesV2,
  getUserDeliveryTariffId
], (orderDetails, recipes, deliveryTariffId) => {
  const {
    deliveryDayId,
    deliverySlotId,
    shippingAddressId,
    deliverySlotLeadTimeId,
  } = orderDetails

  let shippingAddress = {}
  let deliverySlotLeadTime = {}
  let deliveryTariff = {}

  if (shippingAddressId) {
    shippingAddress = { shipping_address: {
      data: {
        type: 'shipping-address',
        id: shippingAddressId
      }
    }}
  }

  if (deliverySlotLeadTimeId) {
    deliverySlotLeadTime = { delivery_slot_lead_time: {
      data: {
        type: 'delivery-slot-lead-time',
        id: deliverySlotLeadTimeId
      }
    }}
  }

  if (deliveryTariffId) {
    deliveryTariff = { delivery_tariff: {
      data: {
        type: ResourceType.DeliveryTariff,
        id: deliveryTariffId
      }
    }}
  }

  return {
    type: ResourceType.Order,
    relationships: {
      ...shippingAddress,
      delivery_slot: {
        data: {
          type: 'delivery-slot',
          id: deliverySlotId
        }
      },
      ...deliverySlotLeadTime,
      delivery_day: {
        data: {
          type: 'delivery-day',
          id: deliveryDayId
        }
      },
      ...deliveryTariff,
      components: {
        data: [
          ...recipes,
        ]
      }
    }
  }
})

export const getUpdateOrderProductItemsOrderV1 = createSelector([getBasketProducts], (products) => {
  const productData = products.map((productQty, productId) => ({
    id: productId,
    quantity: productQty,
    type: 'Product',
  })).toArray()

  return {
    item_choices: productData,
    restrict: 'Product',
  }
})
