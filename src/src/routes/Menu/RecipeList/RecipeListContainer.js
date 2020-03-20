import { connect } from 'react-redux'

import { changeCollectionToAllRecipesViaCTA } from 'actions/filters'
import { showDetailRecipe } from 'actions/menu'
import { getCurrentCollectionId } from 'selectors/filters'
import { getCutoffDate } from '../selectors/cutoff'
import { getCurrentCollectionIsRecommendation } from '../selectors/menu'

import { RecipeList } from './RecipeList'
import { getSortedRecipes } from '../selectors/sorting'

const mapStateToProps = (state) => {
  const { routing } = state
  const { query } = routing && routing.locationBeforeTransitions

  const currentCollectionId = getCurrentCollectionId(state)
  const { recipes, recipeIds } = getSortedRecipes(state)(currentCollectionId)

  return {
    filteredRecipeIds: recipeIds,
    currentCollectionId,
    recipes,
    cutoffDate: getCutoffDate(state),
    numPortions: state.basket.get('numPortions'),
    isCurrentCollectionRecommendation: getCurrentCollectionIsRecommendation(state),
    thematicName: query && query.thematic,
    deliveryDate: state.basket.get('date'),
    browserType: state.request.get('browser')
  }
}
const RecipeListContainer = connect(mapStateToProps, {
  collectionFilterChange: changeCollectionToAllRecipesViaCTA,
  showDetailRecipe
})(RecipeList)

export { RecipeListContainer }
