import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { getBrowserType } from 'selectors/browser'
import { isMobile } from 'utils/view'
import { getRecipes } from 'selectors/root'
import { getFeaturedImage } from 'utils/image'

import { TileImage } from './TileImage'
import { getRecipeOutOfStock } from '../../../selectors/recipe'

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
    media,
    isOutOfStock: getRecipeOutOfStock(state, ownProps),
    isMobile: isMobile(getBrowserType(state))
  }
}

const TileImageContainer = connect(mapStateToProps)(TileImage)

export { TileImageContainer }
