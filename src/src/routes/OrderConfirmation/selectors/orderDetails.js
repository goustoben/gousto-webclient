import Immutable from 'immutable'
import { createSelector } from 'reselect'

const getOrderRecipeItems = ({ basket }) => basket.getIn(['orderDetails', 'recipeItems'], Immutable.List([]))
const getOrderNumPortion = ({ basket }) => basket.getIn(['orderDetails', 'box', 'numPortions'], 0)
export const getOrderRecipes = createSelector(
  getOrderRecipeItems, getOrderNumPortion,
  (recipeItems, orderNumPortion) => {
    let recipeItemsWithQuantity = Immutable.Map({})

    recipeItems.forEach(recipe => {
      const recipeId = recipe.get('itemableId')
      const recipeQuantity = parseInt(recipe.get('quantity') / orderNumPortion, 10)

      recipeItemsWithQuantity = recipeItemsWithQuantity.set(recipeId, recipeQuantity)
    })

    return recipeItemsWithQuantity
  }
)
