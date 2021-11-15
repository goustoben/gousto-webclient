import { getUserOrderById } from "utils/user"
import logger from "utils/logger"
import { basketProductAdd } from "actions/basket/basketProductAdd"
import { basketGiftAdd } from "actions/basket/basketGiftAdd"
import { basketRecipeAdd } from "routes/Menu/actions/basketRecipes/basketRecipeAdd"

export const basketOrderItemsLoad = (orderId, order = null, types = ['product', 'recipe', 'gift'], view = null) => (
  (dispatch, getState) => {
    const userOrder = order || getUserOrderById(orderId, getState().user.get('orders'))

    types.forEach((type) => {
      userOrder.get(`${type}Items`, []).forEach((item) => {
        const itemableId = item.get('itemableId')
        const qty = parseInt(item.get('quantity', 0), 10)
        switch (type) {
          case 'product': {
            for (let i = 0; i < qty; i++) {
              dispatch(basketProductAdd(itemableId, view, orderId))
            }
            break
          }
          case 'recipe': {
            const adjustedQty = Math.round(qty / parseInt(userOrder.getIn(['box', 'numPortions']), 10))

            for (let i = 0; i < adjustedQty; i++) {
              // fall back to the defaults for these 2 params
              const recipeInfo = undefined
              const maxRecipesNum = undefined

              dispatch(basketRecipeAdd(itemableId, view, recipeInfo, maxRecipesNum, orderId))
            }
            break
          }
          case 'gift': {
            const itemableType = item.get('itemableType')

            for (let i = 0; i < qty; i++) {
              dispatch(basketGiftAdd(itemableId, itemableType))
            }
            break
          }
          default:
            logger.error({message: `Cannot add ${type} items to basket`})
        }
      })
    })
  }
)
