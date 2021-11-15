import { menuReplaceRecipeStock } from "actions/menu/menuReplaceRecipeStock"
import { menuChangeRecipeStock } from "actions/menu/menuChangeRecipeStock"
import Immutable from "immutable"
import { getStockAvailability } from "actions/menuActionHelper/getStockAvailability"
import { fetchRecipeStock } from "apis/recipes/fetchRecipeStock"

export function menuLoadStock(clearStock = true) {
  return async (dispatch, getState) => {
    const {auth, basket, boxSummaryDeliveryDays} = getState()
    const date = basket.get('date')
    const coreDayId = boxSummaryDeliveryDays.getIn([date, 'coreDayId'], '')

    if (!coreDayId) {
      return
    }

    const accessToken = auth.get('accessToken')
    const {data: recipeStock} = await fetchRecipeStock(accessToken, coreDayId)

    const adjustedStock = getStockAvailability(getState, recipeStock)

    const recipeStockChangeAction = clearStock ? menuReplaceRecipeStock : menuChangeRecipeStock
    dispatch(recipeStockChangeAction(adjustedStock))

    if (!clearStock) {
      return
    }

    const numPortions = getState().basket.get('numPortions')

    const recipes = getState().basket.get('recipes', Immutable.Map({}))
    recipes.forEach((amount, recipeId) => {
      for (let x = 0; x < amount; x++) {
        dispatch(menuChangeRecipeStock({[recipeId]: {[numPortions]: -1}}))
      }
    })
  }
}
