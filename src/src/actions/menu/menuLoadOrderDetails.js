import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { basketReset } from "actions/basket/basketReset"
import { basketDateChange } from "actions/basket/basketDateChange"
import { basketNumPortionChange } from "actions/basket/basketNumPortionChange"
import menuConfig from "config/menu"
import { basketProductAdd } from "actions/basket/basketProductAdd"
import { basketIdChange } from "actions/basket/basketIdChange"
import { basketOrderLoaded } from "actions/basket/basketOrderLoaded"
import { basketChosenAddressChange } from "actions/basket/basketChosenAddressChange"
import { basketPostcodeChange } from "actions/basket/basketPostcodeChange"
import { findSlot } from "actions/menu/findSlot"
import { basketSlotChange } from "actions/basket/basketSlotChange"
import { productsLoadCategories } from "actions/products/productsLoadCategories"
import { productsLoadProductsById } from "actions/products/productsLoadProductsById"
import { productsLoadStock } from "actions/products/productsLoadStock"
import { temp } from "actions/temp/temp"
import { fetchOrder } from "apis/orders/fetchOrder"
import { basketRecipeAdd } from "routes/Menu/actions/basketRecipes/basketRecipeAdd"

export function menuLoadOrderDetails(orderId) {
  return async (dispatch, getState) => {
    try {
      await dispatch(pending(actionTypes.LOADING_ORDER, true))

      const accessToken = getState().auth.get('accessToken')
      const {data: order} = await fetchOrder(accessToken, orderId, {'includes[]': 'shipping_address'})
      dispatch(basketReset())
      dispatch(menuCutoffUntilReceive(order.shouldCutoffAt))

      dispatch(basketDateChange(order.deliveryDate))
      dispatch(basketNumPortionChange(order.box.numPortions, orderId))

      order.recipeItems.forEach(recipe => {
        const qty = Math.round(parseInt(recipe.quantity, 10) / parseInt(order.box.numPortions, 10))

        const adjustedQty = menuConfig.stockThreshold + qty
        dispatch(menuChangeRecipeStock({
          [recipe.recipeId]: {[order.box.numPortions]: adjustedQty},
        }))

        for (let i = 1; i <= qty; i++) {
          // fall back to the defaults for these 3 params
          const view = undefined
          const recipeInfo = undefined
          const maxRecipesNum = undefined

          dispatch(basketRecipeAdd(recipe.recipeId, view, recipeInfo, maxRecipesNum, orderId))
        }
      })

      const productItems = order.productItems || []
      if (productItems.length) {
        const productItemIds = productItems.map(productItem => productItem.itemableId)
        await dispatch(productsLoadProductsById(productItemIds))
        await dispatch(productsLoadStock())
        await dispatch(productsLoadCategories())
        productItems.forEach((product) => {
          for (let i = 0; i < parseInt(product.quantity, 10); i++) {
            dispatch(basketProductAdd(product.itemableId))
          }
        })
      }

      dispatch(basketIdChange(order.id))
      dispatch(basketOrderLoaded(order.id))
      dispatch(basketChosenAddressChange(order.shippingAddress))

      const grossTotal = order && order.prices && order.prices.grossTotal
      const netTotal = order && order.prices && order.prices.total

      dispatch(temp('originalGrossTotal', grossTotal))
      dispatch(temp('originalNetTotal', netTotal))

      // This sets `boxSummaryDeliveryDays`
      await dispatch(basketPostcodeChange(order.shippingAddress.postcode))

      const newState = getState()
      const coreSlotId = order.deliverySlot.id
      const slotId = findSlot(newState.boxSummaryDeliveryDays, coreSlotId)
      dispatch(basketSlotChange(slotId))
    } finally {
      dispatch(pending(actionTypes.LOADING_ORDER, false))
    }
  }
}
