import { connect } from 'react-redux'

import { changeCollectionToAllRecipesViaCTA } from 'actions/filters'
import { getFilteredRecipeIds } from 'routes/Menu/selectors/filters'
import { getCutoffDate } from 'routes/Menu/selectors/cutoff'
import { getRecipes } from 'routes/Menu/selectors/sorting'
import { getCurrentCollectionIsRecommendation } from 'routes/Menu/selectors/menu'
import { getRecipeGroupFilter } from 'selectors/filters'

import { RecipeList } from './RecipeList'

const mapStateToProps = (state) => {
  const { routing } = state
  const { query } = routing && routing.locationBeforeTransitions
  const recipes = getRecipes(state)

  return {
    allRecipesList: state.menuRecipes,
    cutoffDate: getCutoffDate(state),
    features: state.features,
    filteredRecipeIds: getFilteredRecipeIds(state),
    numPortions: state.basket.get('numPortions'),
    recipesStore: state.recipes,
    isCurrentCollectionRecommendation: getCurrentCollectionIsRecommendation(state) && !getRecipeGroupFilter(state),
    thematicName: query && query.thematic,
    deliveryDate: state.basket.get('date'),
    recipes
  }
}
const RecipeListContainer = connect(mapStateToProps, {
  collectionFilterChange: changeCollectionToAllRecipesViaCTA
})(RecipeList)

export { RecipeListContainer }
