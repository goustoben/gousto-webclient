import { connect } from 'react-redux'

import { changeCollectionToAllRecipesViaCTA } from 'actions/filters'
import { showDetailRecipe } from 'actions/menu'
import { trackRecipeOrderDisplayed } from 'actions/tracking'
import { getCurrentCollectionId, getShortTitle } from 'selectors/filters'
import { getSortedRecipes } from '../../selectors/sorting'
import { getCurrentCollectionIsRecommendation } from '../../selectors/menu'

import { SimplifiedRecipeList } from './SimplifiedRecipeList'

const mapStateToProps = (state) => {
  const collectionId = getCurrentCollectionId(state)
  const { recipes, recipeIds } = getSortedRecipes(state)(collectionId)

  return {
    recipeIds,
    recipes,
    isCurrentCollectionRecommendation: getCurrentCollectionIsRecommendation(state),
    currentCollectionTitle: getShortTitle(state)
  }
}
const SimplifiedRecipeListContainer = connect(mapStateToProps, {
  showDetailRecipe,
  trackRecipeOrderDisplayed,
  changeCollectionToAllRecipesViaCTA,

})(SimplifiedRecipeList)

export { SimplifiedRecipeListContainer }
