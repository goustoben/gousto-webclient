import { connect } from 'react-redux'

import actionTypes from 'actions/actionTypes'
import { changeCollectionToAllRecipesViaCTA } from 'actions/filters'
import { getFilteredRecipeIds } from 'routes/Menu/selectors/filters'
import { getCutoffDate } from 'routes/Menu/selectors/cutoff'
import { getFeaturedRecipes, getRemainingRecipes, getOutOfStockRecipes, getSortedRecipes } from 'routes/Menu/selectors/sorting'
import { getCurrentCollectionIsRecommendation } from 'routes/Menu/selectors/menu'
import { getRecipeGroupFilter } from 'selectors/filters'

import RecipeList from './RecipeList'

const mapStateToProps = (state) => {
  const featuredRecipes = getFeaturedRecipes(state)
  const remainingRecipes = getRemainingRecipes(state)
  const outOfStockRecipes = getOutOfStockRecipes(state)
  const sortedRecipes = getSortedRecipes(state)

  return {
    allRecipesList: state.menuRecipes,
    cutoffDate: getCutoffDate(state),
    isLoading: state.pending.get(actionTypes.MENU_FETCH_DATA, false),
    features: state.features,
    filteredRecipeIds: getFilteredRecipeIds(state),
    filterMenuOpen: state.menu.get('filtersMenuVisible'),
    menuRecieveMenuPending: state.menuRecieveMenuPending,
    numPortions: state.basket.get('numPortions'),
    featuredRecipes,
    remainingRecipes,
    outOfStockRecipes,
    recipesStore: state.recipes,
    isCurrentCollectionRecommendation: getCurrentCollectionIsRecommendation(state) && !getRecipeGroupFilter(state),
    sortedRecipes
  }
}
const RecipeListContainer = connect(mapStateToProps, {
  collectionFilterChange: changeCollectionToAllRecipesViaCTA
})(RecipeList)

export default RecipeListContainer
