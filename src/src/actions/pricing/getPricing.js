import { isOptimizelyFeatureEnabledFactory } from 'containers/OptimizelyRollouts'
import { getAccessToken, getAuthUserId } from 'selectors/auth'
import { getOrderV2 } from 'routes/Menu/selectors/order'
import { transformOrderPricesV2ToOrderV1 } from 'routes/Menu/transformers/orderPricesV2ToV1'
import Immutable from "immutable"
import { getDeliveryTariffId, getSlot } from "utils/deliveries"
import { getNDDFeatureValue } from "selectors/features"
import pricingRequestApi from "apis/pricing/pricing"
import { getOrderPrice } from "routes/Menu/apis/orderV2/getOrderPrice"

export const genObjUniqueKey = (items, index) => {
  if (!items.hasOwnProperty(index)) {
    return index
  }

  return genObjUniqueKey(items, index + 1)
}
export const mergeAllItems = (items) => (
  items.reduce((allItems, basketItems) => {
    const itemInBasket = Object.keys(basketItems)
    itemInBasket.forEach((item, key) => {
      allItems[genObjUniqueKey(allItems, key)] = basketItems[item]
    })

    return allItems
  }, {})
)
export const mapToItemId = (type, basketItems, perItemQuantity) => (
  Object.keys(basketItems).reduce((items, itemId, index) => {
    const quantity = basketItems[itemId]
    Array(quantity).fill().forEach((_, key) => {
      const itemKey = genObjUniqueKey(items, key + index)
      items[itemKey] = {
        id: itemId,
        type,
        quantity: perItemQuantity,
      }
    })

    return items
  }, {})
)
export const getItems = (state) => {
  const {basket} = state
  const recipeIds = basket.get('recipes', Immutable.List([])).toJS()
  const productsIds = basket.get('products', Immutable.List([])).toJS()
  const numPortions = basket.get('numPortions')

  const recipes = mapToItemId('Recipe', recipeIds, numPortions)
  const products = mapToItemId('Product', productsIds, 1)

  const all = mergeAllItems([recipes, products])

  return {
    recipes,
    products,
    all,
  }
}
export const getPricingRequestParamsV1 = (state) => {
  const {basket, boxSummaryDeliveryDays, auth, user} = state
  const accessToken = auth.get('accessToken')
  const isAuthenticated = auth.get('isAuthenticated')
  const promoCode = basket.get('promoCode', false)
  const deliveryDate = basket.get('date', false)
  const deliverySlotId = basket.get('slotId', false)
  const tariffId = basket.get('tariffId', false)
  const shouldSendTariffId = !!tariffId && !isAuthenticated
  const basketItems = getItems(state)
  const items = basketItems.all
  const slot = getSlot(boxSummaryDeliveryDays, deliveryDate, deliverySlotId)
  const daySlotLeadTimeId = slot ? slot.get('daySlotLeadTimeId') : null
  const nddFeatureValue = getNDDFeatureValue(state)
  const deliveryTariffId = getDeliveryTariffId(user, nddFeatureValue)

  const pricingRequestParams = [
    accessToken,
    items,
    deliveryDate,
    deliverySlotId,
    promoCode,
    daySlotLeadTimeId,
    deliveryTariffId
  ]

  if (shouldSendTariffId) {
    pricingRequestParams.push(tariffId)
  }

  return pricingRequestParams
}
export const getPricing = async (dispatch, getState) => {
  const useOrderPricingV2 = await isOptimizelyFeatureEnabledFactory('radishes_order_api_pricing_web_enabled')(dispatch, getState)
  const state = getState()

  if (useOrderPricingV2) {
    const accessToken = getAccessToken(state)
    const orderRequest = getOrderV2(state)
    const userId = getAuthUserId(state)

    const [pricing, error] = await getOrderPrice(accessToken, orderRequest, userId)

    if (error) {
      throw error
    }

    return transformOrderPricesV2ToOrderV1(pricing)
  } else {
    const pricingRequestParams = getPricingRequestParamsV1(state)

    return pricingRequestApi(...pricingRequestParams)
  }
}
