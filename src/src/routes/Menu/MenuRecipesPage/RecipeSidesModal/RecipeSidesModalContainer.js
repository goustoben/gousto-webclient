import { connect } from 'react-redux'
import { getMenuRecipeSidesModalRecipeId } from '../../selectors/menuRecipeSidesModal'
import { RecipeSidesModal } from './RecipeSidesModal'
import { clearSidesModalRecipeId } from '../../actions/menuRecipeSidesModal'
import { getRecipeTitle } from '../../selectors/recipe'

const mapStateToProps = (state, props) => {
  const sidesModalRecipeId = getMenuRecipeSidesModalRecipeId(state)
  const recipeTitle = getRecipeTitle(state, { ...props, recipeId: sidesModalRecipeId })

  return ({
    recipeTitle,
    sidesModalRecipeId,
    shouldShow: !!sidesModalRecipeId,
  })
}

const mapDispatchToProps = {
  clearSidesModalRecipeId,
}

export const RecipeSidesModalContainer = connect(mapStateToProps, mapDispatchToProps)(RecipeSidesModal)
