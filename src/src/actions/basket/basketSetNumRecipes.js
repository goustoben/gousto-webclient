import { actionTypes } from "actions/actionTypes"

export const basketSetNumRecipes = (numRecipes) => ({
  type: actionTypes.BASKET_SET_NUM_RECIPES,
  numRecipes,
})
