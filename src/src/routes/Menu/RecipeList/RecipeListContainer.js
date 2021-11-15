import { connect } from 'react-redux'
import { getCurrentCollectionId } from '../selectors/collections'

import { RecipeList } from './RecipeList'
import { getRecipeListRecipes } from '../selectors/recipeList'
import { trackRecipeOrderDisplayed } from "actions/tracking/trackRecipeOrderDisplayed"

const mapStateToProps = (state) => {
  const currentCollectionId = getCurrentCollectionId(state)
  const { recipes, originalOrderRecipeIds } = getRecipeListRecipes(state)

  return {
    currentCollectionId,
    recipes,
    originalOrderRecipeIds
  }
}
const RecipeListContainer = connect(mapStateToProps, {trackRecipeOrderDisplayed})(RecipeList)

export { RecipeListContainer }
