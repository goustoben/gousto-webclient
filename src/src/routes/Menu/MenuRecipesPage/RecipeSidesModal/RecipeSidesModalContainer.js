import { connect } from 'react-redux'
import { getMenuRecipeSidesModalRecipe } from '../../selectors/menuRecipeSidesModal'
import { RecipeSidesModal } from './RecipeSidesModal'
import { clearSidesModalRecipe } from '../../actions/menuRecipeSidesModal'
import { getRecipeTitle } from '../../selectors/recipe'

const mapStateToProps = (state) => {
  const sidesModalRecipe = getMenuRecipeSidesModalRecipe(state)
  const sidesModalRecipeId = sidesModalRecipe ? sidesModalRecipe.recipeId : null
  const recipeTitle = getRecipeTitle(state, { recipeId: sidesModalRecipeId })

  return {
    recipeTitle,
    sidesModalRecipeId,
    shouldShow: !!sidesModalRecipeId,
  }
}

const mapDispatchToProps = {
  clearSidesModalRecipe,
}

export const RecipeSidesModalContainer = connect(mapStateToProps, mapDispatchToProps)(RecipeSidesModal)
