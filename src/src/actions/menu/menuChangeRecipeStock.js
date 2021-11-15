import { actionTypes } from "actions/actionTypes"

export function menuChangeRecipeStock(stock) {
  return ({
    type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
    stock,
  })
}
