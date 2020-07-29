import { connect } from 'react-redux'
import { getBrowserType } from 'selectors/browser'
import { getCurrentCollectionId, isCurrentCollectionRecommendation } from '../selectors/collections'
import { getIsEnabledRecipeTileFoundation } from '../selectors/menu'

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
    numPortions: state.basket.get('numPortions'),
    isCurrentCollectionRecommendation: isCurrentCollectionRecommendation(state),
    thematicName: query && query.thematic,
    deliveryDate: state.basket.get('date'),
    browserType: getBrowserType(state),
    isEnabledRecipeTileFoundation: getIsEnabledRecipeTileFoundation(state)
  }
}
const RecipeListContainer = connect(mapStateToProps)(RecipeList)

export { RecipeListContainer }
