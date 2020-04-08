import { connect } from 'react-redux'

import { changeCollectionToAllRecipesViaCTA } from 'actions/filters'
import { showDetailRecipe } from 'actions/menu'
import { trackRecipeOrderDisplayed } from 'actions/tracking'
import { getSortedRecipes } from '../../selectors/sorting'
import { getCurrentCollectionId, isCurrentCollectionRecommendation, getCurrentCollectionShortTitle } from '../../selectors/collections'

import { SimplifiedRecipeList } from './SimplifiedRecipeList'

const mapStateToProps = (state) => {
  const collectionId = getCurrentCollectionId(state)
  const { recipes, recipeIds } = getSortedRecipes(state)(collectionId)

  return {
    recipeIds,
    recipes,
    isCurrentCollectionRecommendation: isCurrentCollectionRecommendation(state),
    currentCollectionTitle: getCurrentCollectionShortTitle(state)
  }
}
const SimplifiedRecipeListContainer = connect(mapStateToProps, {
  showDetailRecipe,
  trackRecipeOrderDisplayed,
  changeCollectionToAllRecipesViaCTA,

})(SimplifiedRecipeList)

export { SimplifiedRecipeListContainer }
