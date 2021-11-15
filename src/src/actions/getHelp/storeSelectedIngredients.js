import { actionTypes } from "actions/actionTypes"

const storeSelectedIngredients = (selectedIngredientsInfo) => ({
  type: actionTypes.GET_HELP_STORE_SELECTED_INGREDIENTS,
  selectedIngredientsInfo,
})
export { storeSelectedIngredients }
