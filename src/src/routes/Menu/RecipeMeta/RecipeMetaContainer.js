import { connect } from 'react-redux'

import { RecipeMeta } from 'RecipeMeta'

const mapStateToProps = (state, props) => {
  let recipe = null
  const { recipes } = state
  const { query } = props
  const recipeId = query ? query.recipeDetailId : ''

  if (recipeId) {
    recipe = recipes.get(recipeId, null)
  }

  return {
    recipe,
  }
}

export const RecipeMetaContainer = connect(
  mapStateToProps,
)(RecipeMeta)
