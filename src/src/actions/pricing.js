import { requestPricing } from 'apis/pricing'
import Immutable from 'immutable'
import { getDeliveryTariffId, getSlot } from 'utils/deliveries'
import { getNDDFeatureValue } from 'selectors/features'
import { getIsOrderWithoutRecipes, getOrderV2 } from 'routes/Menu/selectors/order'
import { getAccessToken, getAuthUserId } from 'selectors/auth'
import { transformOrderPricesV2ToOrderV1 } from 'routes/Menu/transformers/orderPricesV2ToV1'
import { getOrderPrice } from 'routes/Menu/apis/orderV2'
import { getBasketRecipesCount, getBasketSlotId } from 'selectors/basket'
import { actionTypes } from './actionTypes'

const pricingPending = () => ({
  type: actionTypes.PRICING_PENDING,
})

export const pricingSuccess = (prices) => ({
  type: actionTypes.PRICING_SUCCESS,
  prices,
})

const pricingFailure = (message) => ({
  type: actionTypes.PRICING_FAILURE,
  message,
})

const pricingReset = () => ({
  type: actionTypes.PRICING_RESET,
})

const genObjUniqueKey = (items, index) => {
  if (!items.hasOwnProperty(index)) {
    return index
  }

  return genObjUniqueKey(items, index + 1)
}

const mapToItemId = (type, basketItems, perItemQuantity) => (
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

const mergeAllItems = (items) => (
  items.reduce((allItems, basketItems) => {
    const itemInBasket = Object.keys(basketItems)
    itemInBasket.forEach((item, key) => {
      allItems[genObjUniqueKey(allItems, key)] = basketItems[item]
    })

    return allItems
  }, {})
)

const getItems = (state) => {
  const { basket } = state
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

const getPricingRequestParamsV1 = (state) => {
  const { basket, boxSummaryDeliveryDays, auth, user } = state
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

const getPricing = async (_, getState) => {
  // TODO: When radishes pickup Order V2 work this flag and V1 will be removed as part of that work
  const useOrderPricingV2 = false
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

    return requestPricing(...pricingRequestParams)
  }
}

const pricingClear = () => async (dispatch, getState) => {
  const prices = getState().pricing.get('prices').toJS()

  if (Object.keys(prices).length) {
    dispatch(pricingReset())
  }
}

export const pricingRequest = () => async (dispatch, getState) => {
  const state = getState()
  const deliverySlotId = getBasketSlotId(state)
  const recipesCount = getBasketRecipesCount(state)
  const isOrderWithoutRecipes = getIsOrderWithoutRecipes(state)

  if (!deliverySlotId) return

  if (!isOrderWithoutRecipes && recipesCount < 2) {
    dispatch(pricingClear())

    return
  }

  dispatch(pricingPending())

  try {
    const basketPrices = await getPricing(dispatch, getState)
    dispatch(pricingSuccess(basketPrices.data))
  } catch (error) {
    if (typeof error !== 'string') {
      dispatch(pricingFailure('Something\'s gone wrong signing you up, please try again or contact our customer care team.'))

      return
    }

    dispatch(pricingFailure(error))
  }
}

const pricingActions = {
  pricingClear,
  pricingRequest
}

export default pricingActions
