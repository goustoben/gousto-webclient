import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getBrowserType } from 'selectors/browser'
import { getRecipes } from 'selectors/root'
import { getFeaturedImage } from 'utils/image'

import { Image } from './Image'
import { getRecipeOutOfStock } from '../../selectors/recipe'

const getIdForRecipeImage = (state, props) => props.recipeId

const getRecipeForRecipeImage = createSelector(
  [getRecipes, getIdForRecipeImage],
  (allRecipes, recipeId) => allRecipes.get(recipeId)
)

const mapStateToProps = (state, ownProps) => {
  const { view } = ownProps

  const browserType = getBrowserType(state)
  const recipe = getRecipeForRecipeImage(state, ownProps)

  const media = getFeaturedImage(recipe, view, browserType)

  return {
    view,
    media,
    isOutOfStock: getRecipeOutOfStock(state, ownProps)
  }
}

const RecipeImageContainer = connect(mapStateToProps)(Image)

export { RecipeImageContainer }
