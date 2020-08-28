import { connect } from 'react-redux'
import { getMenuRecipeSidesModalRecipe } from '../../selectors/menuRecipeSidesModal'
import { RecipeSidesModal } from './RecipeSidesModal'
import { clearSidesModalRecipe } from '../../actions/menuRecipeSidesModal'
import { getRecipeTitle, getRecipeSelectedSides } from '../../selectors/recipe'

const mapStateToProps = (state, props) => {
  const sidesModalRecipe = getMenuRecipeSidesModalRecipe(state)
  const sidesModalRecipeId = sidesModalRecipe ? sidesModalRecipe.recipeId : null
  const propsWithRecipeId = { ...props, recipeId: sidesModalRecipeId }
  const selectedRecipeSide = getRecipeSelectedSides(state, propsWithRecipeId)
  const recipeTitle = getRecipeTitle(state, propsWithRecipeId)

  return ({
    recipeTitle,
    sidesModalRecipeId,
    shouldShow: !!sidesModalRecipeId,
    selectedRecipeSide,
  })
}

const mapDispatchToProps = {
  clearSidesModalRecipe,
}

export const RecipeSidesModalContainer = connect(mapStateToProps, mapDispatchToProps)(RecipeSidesModal)
