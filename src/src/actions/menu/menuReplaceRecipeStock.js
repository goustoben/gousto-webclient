import { actionTypes } from "actions/actionTypes"

export function menuReplaceRecipeStock(stock) {
  return ({
    type: actionTypes.MENU_RECIPE_STOCK_REPLACE,
    stock,
  })
}
