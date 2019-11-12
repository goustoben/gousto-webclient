import pricingRequestApi from 'apis/pricing'
import Immutable from 'immutable'
import actionTypes from './actionTypes'
import { getDeliveryTariffId, getSlot } from 'utils/deliveries'
import { getNDDFeatureValue } from 'selectors/features'

const pricingPending = () => ({
  type: actionTypes.PRICING_PENDING,
})

const pricingSuccess = (prices) => ({
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

const getItems = (basket) => {
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

const pricingActions = {
  pricingRequest() {
    return async (dispatch, getState) => {
      const { basket, boxSummaryDeliveryDays, auth, features, user } = getState()
      const accessToken = auth.get('accessToken')
      const isAuthenticated = auth.get('isAuthenticated')
      const promoCode = basket.get('promoCode', false)
      const deliveryDate = basket.get('date', false)
      const deliverySlotId = basket.get('slotId', false)
      const tariffId = basket.get('tariffId', false)
      const shouldSendTariffId = !!tariffId && !isAuthenticated
      const basketItems = getItems(basket)
      const items = basketItems.all
      const slot = getSlot(boxSummaryDeliveryDays, deliveryDate, deliverySlotId)
      const daySlotLeadTimeId = slot ? slot.get('daySlotLeadTimeId') : null
      const nddFeatureValue = getNDDFeatureValue(getState())
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

      shouldSendTariffId && pricingRequestParams.push(tariffId)

      if (!deliverySlotId) {
        return undefined
      }

      if (Object.keys(basketItems.recipes).length < 2) {
        dispatch(this.pricingClear())

        return undefined
      }

      try {
        dispatch(pricingPending())
        const basketPrices = await pricingRequestApi(...pricingRequestParams)
        dispatch(pricingSuccess(basketPrices.data))
      } catch (err) {
        let error = err
        if (typeof err !== 'string') {
          error = 'Something\'s gone wrong signing you up, please try again or contact our customer care team.'
        }
        dispatch(pricingFailure(error))
      }

      return undefined
    }
  },
  pricingClear: () => (
    async (dispatch, getState) => {
      const prices = getState().pricing.get('prices').toJS()

      if (Object.keys(prices).length) {
        dispatch(pricingReset())
      }
    }
  ),
  updatePrices: (prices) => (
    (dispatch) => {
      dispatch(pricingSuccess(prices))
    }
  ),
}

export default pricingActions
