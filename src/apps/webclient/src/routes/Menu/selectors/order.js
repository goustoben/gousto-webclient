import { Map } from 'immutable'
import { createSelector } from 'reselect'

import {
  getBasketDate,
  getBasketMenuId,
  getBasketOrderId,
  getBasketProducts,
  getBasketRecipes,
  getBasketSlotId,
  getChosenAddressId,
  getNumPortions,
  getPromoCode,
} from 'selectors/basket'
import { getNDDFeatureValue } from 'selectors/features'
import { getBoxSummaryDeliveryDays } from 'selectors/root'
import { getUserOrders } from 'selectors/user'
import { getSlot, getDeliveryTariffId } from 'utils/deliveries'

import { ResourceType } from '../constants/resources'

const getRecipesV1 = createSelector([getBasketRecipes, getNumPortions], (recipes, quantity) =>
  recipes.reduce(
    (memo, recipeAmount, id) => [
      ...memo,
      ...Array.from(Array(recipeAmount).keys()).map(() => ({
        id,
        quantity,
        type: 'Recipe',
      })),
    ],
    [],
  ),
)

export const getSlotForBoxSummaryDeliveryDays = createSelector(
  [getBasketSlotId, getBasketDate, getBoxSummaryDeliveryDays],
  (slotId, date, boxSummaryDeliveryDays) => [getSlot(boxSummaryDeliveryDays, date, slotId), slotId],
)

const emptyMap = new Map({})

const getOrderDetailsForBasket = createSelector(
  [getSlotForBoxSummaryDeliveryDays, getBasketDate, getChosenAddressId, getBoxSummaryDeliveryDays],
  ([slot], date, shippingAddressId, boxSummaryDeliveryDays) => {
    const safeSlot = slot || emptyMap
    const safeBoxSummaryDeliveryDays = boxSummaryDeliveryDays || emptyMap
    const deliverySlotUUID = safeSlot.get('id', '')
    const deliverySlotId = safeSlot.get('coreSlotId', '')
    const deliveryDayId = safeBoxSummaryDeliveryDays.getIn([date, 'coreDayId'])
    const deliverySlotLeadTimeId = safeSlot.get('daySlotLeadTimeId', '')

    return {
      deliverySlotUUID,
      deliveryDayId,
      deliverySlotId,
      deliverySlotLeadTimeId,
      shippingAddressId,
    }
  },
)

export const getUserDeliveryTariffId = (state) =>
  getDeliveryTariffId(state.user, getNDDFeatureValue(state))

export const getOrderDetails = createSelector(
  [getOrderDetailsForBasket, getRecipesV1, getUserDeliveryTariffId, getBasketOrderId, getPromoCode],
  (orderDetails, recipes, deliveryTariffId, orderId, promoCode) => {
    const { deliveryDayId, deliverySlotId, shippingAddressId, deliverySlotLeadTimeId } =
      orderDetails

    return {
      delivery_day_id: deliveryDayId,
      delivery_slot_id: deliverySlotId,
      recipe_choices: recipes,
      day_slot_lead_time_id: deliverySlotLeadTimeId,
      address_id: shippingAddressId,
      delivery_tariff_id: deliveryTariffId,
      ...(orderId ? { order_id: orderId } : {}),
      ...(promoCode ? { promo_code: promoCode } : {}),
    }
  },
)

export const getCouldBasketBeExpired = createSelector(
  [getOrderDetailsForBasket, getBasketRecipes],
  ({ deliveryDayId, deliverySlotId }, recipes) =>
    !(deliveryDayId && deliverySlotId && recipes.size > 0),
)

export const getOrderAction = createSelector(
  [getUserOrders, getBasketOrderId],
  (userOrders, orderId) => {
    const userOrder = userOrders.find((order) => order.get('id') === orderId)
    const recipeAction = userOrder && userOrder.get('recipeItems').size > 0 ? 'update' : 'choice'
    const orderAction = orderId ? `recipe-${recipeAction}` : 'create'

    return orderAction
  },
)

export const getOrderForUpdateOrderV1 = createSelector(
  [getOrderDetailsForBasket, getRecipesV1, getOrderAction],
  (orderDetails, recipes, orderAction) => {
    const { deliveryDayId, deliverySlotId, shippingAddressId, deliverySlotLeadTimeId } =
      orderDetails

    return {
      delivery_day_id: deliveryDayId,
      delivery_slot_id: deliverySlotId,
      recipe_choices: recipes,
      day_slot_lead_time_id: deliverySlotLeadTimeId,
      address_id: shippingAddressId,
      order_action: orderAction,
    }
  },
)

const getRecipesV2 = createSelector(
  [
    // menuService is not an ImmutableJS Object
    (state) => state.menuService.recipe,
    getBasketRecipes,
    getNumPortions,
  ],
  (recipes, basketRecipes, quantity) => {
    // We check if we have the recipe data, this might not
    // be in the store yet as we are making the request

    if (!recipes) return []

    return basketRecipes.reduce(
      (memo, recipeAmount, id) => [
        ...memo,
        ...Array.from(Array(recipeAmount).keys())
          .map(
            () => ({
              id: recipes[id] ? recipes[id].id : '',
              type: ResourceType.Recipe,
              meta: {
                portion_for: quantity,
              },
            }),
            // We can have recipes in your basket that we don't have menu
            // due to switch over other states. So we want to exclude these.
          )
          .filter((recipe) => Boolean(recipe.id)),
      ],
      [],
    )
  },
)

export const getProductsV2 = createSelector([getBasketProducts], (products = []) =>
  products.reduce(
    (memo, quantity, productId) => [
      ...memo,
      {
        id: productId,
        type: ResourceType.Product,
        meta: {
          quantity,
        },
      },
    ],
    [],
  ),
)

export const getOrderV2 = createSelector(
  [
    getBasketOrderId,
    getOrderDetailsForBasket,
    getRecipesV2,
    getProductsV2,
    getUserDeliveryTariffId,
    getPromoCode,
    getBasketMenuId,
  ],
  (orderId, orderDetails, recipes, products, deliveryTariffId, promoCode, menuId) => {
    const {
      deliveryDayId,
      deliverySlotId,
      deliverySlotUUID,
      shippingAddressId,
      deliverySlotLeadTimeId,
    } = orderDetails

    const orderV2 = {
      type: ResourceType.Order,
      relationships: {
        components: {
          data: [...recipes, ...products],
        },
      },
      attributes: {
        menu_id: menuId,
      },
    }

    if (orderId) {
      orderV2.id = orderId
    }

    if (shippingAddressId) {
      orderV2.relationships.shipping_address = {
        data: {
          type: 'shipping-address',
          id: shippingAddressId,
        },
      }
    }

    if (deliverySlotId) {
      orderV2.relationships.delivery_slot = {
        data: {
          type: 'delivery-slot',
          id: deliverySlotId,
          meta: {
            uuid: deliverySlotUUID,
          },
        },
      }
    }

    if (deliverySlotLeadTimeId) {
      orderV2.relationships.delivery_slot_lead_time = {
        data: {
          type: 'delivery-slot-lead-time',
          id: deliverySlotLeadTimeId,
        },
      }
    }

    if (deliveryDayId) {
      orderV2.relationships.delivery_day = {
        data: {
          type: 'delivery-day',
          id: deliveryDayId,
        },
      }
    }

    if (deliveryTariffId) {
      orderV2.relationships.delivery_tariff = {
        data: {
          type: ResourceType.DeliveryTariff,
          id: deliveryTariffId,
        },
      }
    }

    if (promoCode) {
      orderV2.attributes.prices = {
        promo_code: promoCode,
      }
    }

    return orderV2
  },
)

export const getUpdateOrderProductItemsOrderV1 = createSelector([getBasketProducts], (products) => {
  const productData = products
    .map((productQty, productId) => ({
      id: productId,
      quantity: productQty,
      type: 'Product',
    }))
    .toArray()

  return {
    item_choices: productData,
    restrict: 'Product',
  }
})
