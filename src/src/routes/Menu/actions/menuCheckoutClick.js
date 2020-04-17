
import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { basketCheckedOut, basketCheckoutClicked, basketProceedToCheckout } from 'actions/basket'
import { boxSummaryVisibilityChange } from 'actions/boxSummary'
import { checkoutTransactionalOrder } from 'actions/checkout'
import status from 'actions/status'
import { orderUpdate } from 'actions/order'
import { getBasketRecipes, getNumPortions } from 'selectors/basket'
import { getIsAuthenticated } from 'selectors/auth'
import { getSlot } from 'utils/deliveries'
import { getMenuLimitsForBasket, validateRecipeAgainstRule } from '../selectors/menu'

const expandRecipeArrayForQuantity = (recipes) => (
  recipes.reduce((recipesArray, qty, recipeId) => {
    for (let i = 1; i <= qty; i++) {
      recipesArray.push(recipeId)
    }

    return recipesArray
  }, [])
)

const getOrderAction = (userOrders, orderId) => {
  const userOrder = userOrders.find(order => order.get('id') === orderId)
  const recipeAction = (userOrder && userOrder.get('recipeItems').size > 0) ? 'update' : 'choice'
  const orderAction = orderId ? `recipe-${recipeAction}` : 'create'

  return orderAction
}

const getCoreSlotId = (deliveryDays, date, slotId) => {
  const slot = getSlot(deliveryDays, date, slotId)
  let coreSlotId = ''
  if (slot) {
    coreSlotId = slot.get('coreSlotId', '')
  }

  return coreSlotId
}

export const checkoutBasket = (section, view) => (dispatch, getState) => {
  const { boxSummaryDeliveryDays, basket, user, auth } = getState()
  const isAuthenticated = getIsAuthenticated({ auth })
  const slotId = getCoreSlotId(boxSummaryDeliveryDays, basket.get('date'), basket.get('slotId'))
  const deliveryDayId = boxSummaryDeliveryDays.getIn([basket.get('date'), 'coreDayId'])
  const orderId = basket.get('orderId')
  const userOrders = user.get('orders', Immutable.List([]))
  const recipes = getBasketRecipes({ basket })
  const numPortions = getNumPortions({ basket })
  const menuLimitsForBasket = getMenuLimitsForBasket(getState())

  dispatch(boxSummaryVisibilityChange(false))
  dispatch(basketCheckedOut(recipes.size, view))
  dispatch(basketCheckoutClicked(section))

  const basketBreakingRules = {
    errorTitle: 'Basket Not Valid',
    recipeId: null,
    rules: []
  }

  basketBreakingRules.rules = validateRecipeAgainstRule(menuLimitsForBasket, null, recipes)

  if (basketBreakingRules.rules.length) {
    dispatch(status.error(actionTypes.BASKET_NOT_VALID, basketBreakingRules))

    return
  }

  if (orderId) {
    dispatch(orderUpdate(orderId, expandRecipeArrayForQuantity(recipes), deliveryDayId, slotId, numPortions, getOrderAction(userOrders, orderId)))
  } else if (!isAuthenticated) {
    dispatch(basketProceedToCheckout())
  } else {
    dispatch(checkoutTransactionalOrder('create'))
  }
}

export const clearBasketNotValidError = () => (dispatch) => {
  dispatch(status.error(actionTypes.BASKET_NOT_VALID, null))
}
