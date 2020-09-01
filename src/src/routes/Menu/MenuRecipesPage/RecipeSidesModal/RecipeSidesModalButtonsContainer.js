import { connect } from 'react-redux'
import { RecipeSidesModalButtons } from './RecipeSidesModalButtons'
import { basketRecipeAdd, basketRecipeRemove } from '../../actions/basketRecipes'
import { clearSidesModalRecipe } from '../../actions/menuRecipeSidesModal'
import { unselectRecipeSide } from '../../../../actions/menu'
import { trackAddSide, trackNoSide } from '../../actions/menuRecipeSidesTracking'
import { getRecipeSelectedSides } from '../../selectors/recipe'
import { getMenuRecipeSidesModalRecipe } from '../../selectors/menuRecipeSidesModal'

const mapStateToProps = (state, props) => {
  const { sidesModalRecipeId } = props
  const propsWithRecipeId = { ...props, recipeId: sidesModalRecipeId }
  const sidesModalRecipe = getMenuRecipeSidesModalRecipe(state)
  const selectedRecipeSide = getRecipeSelectedSides(state, propsWithRecipeId)

  return ({
    sidesModalRecipe,
    selectedRecipeSide,
  })
}

const mapDispatchToProps = {
  clearSidesModalRecipe,
  basketRecipeAdd,
  basketRecipeRemove,
  unselectRecipeSide,
  trackAddSide,
  trackNoSide
}

export const RecipeSidesModalButtonsContainer = connect(mapStateToProps, mapDispatchToProps)(RecipeSidesModalButtons)
