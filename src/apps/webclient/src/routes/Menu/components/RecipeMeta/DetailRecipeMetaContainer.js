import { connect } from 'react-redux'
import { RecipeMeta } from './RecipeMeta'
import { getMenuRecipeIdForDetails } from '../../selectors/menuRecipeDetails'

const mapStateToProps = (state) => {
  let recipe = null
  const { recipes } = state
  const recipeId = getMenuRecipeIdForDetails(state)

  if (recipeId) {
    recipe = recipes.get(recipeId, null)
  }

  return {
    recipe,
  }
}

export const DetailRecipeMetaContainer = connect(mapStateToProps)(RecipeMeta)
