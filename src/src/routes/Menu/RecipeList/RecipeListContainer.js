import { connect } from 'react-redux'

import { changeCollectionToAllRecipesViaCTA } from 'actions/filters'
import { getFilteredRecipeIds } from 'routes/Menu/selectors/filters'
import { getCutoffDate } from 'routes/Menu/selectors/cutoff'
import { getFeaturedRecipes, getRemainingRecipes, getSortedRecipes } from 'routes/Menu/selectors/sorting'
import { getCurrentCollectionIsRecommendation } from 'routes/Menu/selectors/menu'
import { getRecipeGroupFilter } from 'selectors/filters'

import { RecipeList } from './RecipeList'

const getSortedRecipesForCollection = (state, collectionId) => {
  const sortedRecipes = getSortedRecipes(state)

  if (!collectionId) {
    return sortedRecipes
  }

  const recipesInCollection = state.menuCollectionRecipes.get(collectionId)
  const recipeIsInCollection = (recipe) => {
    const id = recipe.get('id')

    return recipesInCollection.includes(id)
  }

  return sortedRecipes.filter(recipeIsInCollection)
}

const mapStateToProps = (state, { menuCurrentCollectionId: collectionId }) => {
  const { routing } = state
  const { query } = routing && routing.locationBeforeTransitions

  const featuredRecipes = getFeaturedRecipes(state)
  const remainingRecipes = getRemainingRecipes(state)
  const sortedRecipes = getSortedRecipesForCollection(state, collectionId)

  return {
    allRecipesList: state.menuRecipes,
    cutoffDate: getCutoffDate(state),
    features: state.features,
    filteredRecipeIds: getFilteredRecipeIds(state),
    numPortions: state.basket.get('numPortions'),
    featuredRecipes,
    remainingRecipes,
    recipesStore: state.recipes,
    isCurrentCollectionRecommendation: getCurrentCollectionIsRecommendation(state) && !getRecipeGroupFilter(state),
    sortedRecipes,
    thematicName: query && query.thematic,
    deliveryDate: state.basket.get('date')
  }
}
const RecipeListContainer = connect(mapStateToProps, {
  collectionFilterChange: changeCollectionToAllRecipesViaCTA
})(RecipeList)

export { RecipeListContainer }
