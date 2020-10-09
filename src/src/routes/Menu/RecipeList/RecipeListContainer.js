import { connect } from 'react-redux'
import { trackRecipeOrderDisplayed } from 'actions/tracking'
import { getBrowserType } from 'selectors/browser'
import { getCurrentCollectionId } from '../selectors/collections'

import { RecipeList } from './RecipeList'
import { getRecipeListRecipes } from '../selectors/recipeList'

const mapStateToProps = (state) => {
  const currentCollectionId = getCurrentCollectionId(state)
  const { recipes, originalOrderRecipeIds } = getRecipeListRecipes(state)

  return {
    currentCollectionId,
    recipes,
    originalOrderRecipeIds,
    browserType: getBrowserType(state),
  }
}
const RecipeListContainer = connect(mapStateToProps, {trackRecipeOrderDisplayed})(RecipeList)

export { RecipeListContainer }
