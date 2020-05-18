import { connect } from 'react-redux'

import { changeCollectionToAllRecipesViaCTA } from 'actions/filters'
import { getCutoffDate } from '../selectors/cutoff'
import { getCurrentCollectionId, isCurrentCollectionRecommendation } from '../selectors/collections'

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
    isCurrentCollectionRecommendation: isCurrentCollectionRecommendation(state),
    thematicName: query && query.thematic,
    deliveryDate: state.basket.get('date'),
    browserType: state.request.get('browser')
  }
}
const RecipeListContainer = connect(mapStateToProps, {
  collectionFilterChange: changeCollectionToAllRecipesViaCTA
})(RecipeList)

export { RecipeListContainer }
