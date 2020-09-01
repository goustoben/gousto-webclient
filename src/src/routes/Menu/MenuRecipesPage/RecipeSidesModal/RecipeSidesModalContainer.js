import { connect } from 'react-redux'
import { getMenuRecipeSidesModalRecipe } from '../../selectors/menuRecipeSidesModal'
import { RecipeSidesModal } from './RecipeSidesModal'
import { clearSidesModalRecipe } from '../../actions/menuRecipeSidesModal'
import { unselectRecipeSide } from '../../../../actions/menu'
import { trackCloseSide } from '../../actions/menuRecipeSidesTracking'
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
  unselectRecipeSide,
  trackCloseSide
}

export const RecipeSidesModalContainer = connect(mapStateToProps, mapDispatchToProps)(RecipeSidesModal)
