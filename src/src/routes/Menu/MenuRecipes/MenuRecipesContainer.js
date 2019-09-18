import { connect } from 'react-redux'
import { filterRecipeGrouping, clearAllFilters, changeCollectionById } from 'actions/filters'
import { menuRecipeDetailVisibilityChange } from 'actions/menu'
import { getCollectionIdWithName, getDefaultCollectionId } from 'utils/collections'
import { getFilteredRecipeIds } from '../selectors/filters'
import { getCurrentCollectionIsRecommendation } from '../selectors/menu'

import { MenuRecipes } from './MenuRecipes'

const mapStateToProps = (state, ownProps) => {
  const collectionName = (ownProps.query) ? ownProps.query.collection : ''

  let collectionId = getCollectionIdWithName(state, collectionName)
  if (!collectionId) {
    if (getCurrentCollectionIsRecommendation(state)) {
      collectionId = getCurrentCollectionIsRecommendation(state)
    } else {
      collectionId = getDefaultCollectionId(state)
    }
  }

  return ({
    filteredRecipesNumber: getFilteredRecipeIds(state).size,
    menuRecipeDetailShow: (ownProps.query) ? ownProps.query.recipeDetailId : '',
    menuCurrentCollectionId: collectionId,
  })
}

const mapDispatchToProps = {
  setThematic: filterRecipeGrouping,
  selectCurrentCollection: changeCollectionById,
  detailVisibilityChange: menuRecipeDetailVisibilityChange,
  clearAllFilters
}

const MenuRecipesContainer = connect(mapStateToProps, mapDispatchToProps)(MenuRecipes)

export { MenuRecipesContainer }
