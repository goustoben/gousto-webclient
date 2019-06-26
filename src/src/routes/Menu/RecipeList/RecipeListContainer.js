import { connect } from 'react-redux'

import actionTypes from 'actions/actionTypes'
import { changeCollectionToAllRecipes } from 'actions/filters'
import { getFilteredRecipeIds } from 'routes/Menu/selectors/filters'
import { getCutoffDate } from 'routes/Menu/selectors/cutoff'
import { getFeaturedRecipes, getRemainingRecipes, getOutOfStockRecipes } from 'routes/Menu/selectors/sorting'
import { getCurrentCollectionIsRecommendation } from 'routes/Menu/selectors/menu'
import RecipeList from './RecipeList'

const mapStateToProps = (state) => ({
  allRecipesList: state.menuRecipes,
  cutoffDate: getCutoffDate(state),
  isLoading: state.pending.get(actionTypes.MENU_FETCH_DATA, false),
  features: state.features,
  filteredRecipeIds: getFilteredRecipeIds(state),
  filterMenuOpen: state.menu.get('filtersMenuVisible'),
  menuRecieveMenuPending: state.menuRecieveMenuPending,
  numPortions: state.basket.get('numPortions'),
  featuredRecipes: getFeaturedRecipes(state),
  remainingRecipes: getRemainingRecipes(state),
  outOfStockRecipes: getOutOfStockRecipes(state),
  recipesStore: state.recipes,
  isCurrentCollectionRecommendation: getCurrentCollectionIsRecommendation(state),
})

const RecipeListContainer = connect(mapStateToProps, {
  collectionFilterChange: changeCollectionToAllRecipes
})(RecipeList)

export default RecipeListContainer
