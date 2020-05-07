import { connect } from 'react-redux'
import { getVariantsForRecipe } from '../../../selectors/variants'
import { getRecipeById, getRecipeTitle } from '../../../../../selectors/recipe'
import { DropdownRecipeList } from './DropdownRecipeList'

const mapStateToProps = (state, ownProps) => {
  const recipe = getRecipeById(state, ownProps.recipeId)
  let selectedRecipe = {
  }

  if (recipe) {
    selectedRecipe = {
      displayName: getRecipeTitle(recipe),
      coreRecipeId: ownProps.recipeId
    }
  }

  return {
    recipeVariants: getVariantsForRecipe(state, ownProps),
    selectedRecipe
  }
}

const DropdownRecipeListContainer = connect(mapStateToProps)(DropdownRecipeList)

export { DropdownRecipeListContainer }
