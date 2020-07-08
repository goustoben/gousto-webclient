import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { getRecipes } from 'selectors/root'

import { RoundelImage } from './RoundelImage'

const getIdForRoundelImage = (state, props) => props.recipeId

const getRecipeForRoundelImage = createSelector(
  [getRecipes, getIdForRoundelImage],
  (allRecipes, recipeId) => allRecipes.get(recipeId)
)

const mapStateToProps = (state, ownProps) => {
  const recipe = getRecipeForRoundelImage(state, ownProps)

  return {
    roundelImage: recipe.get('roundelImage')
  }
}

const RoundelImageContainer = connect(mapStateToProps)(RoundelImage)

export { RoundelImageContainer }
