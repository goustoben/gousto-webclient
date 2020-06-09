import { connect } from 'react-redux'

import { getCutoffDate } from '../selectors/cutoff'
import { getCurrentCollectionId, isCurrentCollectionRecommendation } from '../selectors/collections'

import { RecipeList } from './RecipeList'
import { getRecipeListRecipes } from '../selectors/recipeList'

const mapStateToProps = (state) => {
  const { routing } = state
  const { query } = routing && routing.locationBeforeTransitions

  const currentCollectionId = getCurrentCollectionId(state)
  const { recipes, originalOrderRecipeIds } = getRecipeListRecipes(state)

  return {
    currentCollectionId,
    recipes,
    originalOrderRecipeIds,
    cutoffDate: getCutoffDate(state),
    numPortions: state.basket.get('numPortions'),
    isCurrentCollectionRecommendation: isCurrentCollectionRecommendation(state),
    thematicName: query && query.thematic,
    deliveryDate: state.basket.get('date'),
    browserType: state.request.get('browser')
  }
}
const RecipeListContainer = connect(mapStateToProps)(RecipeList)

export { RecipeListContainer }
