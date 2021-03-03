import { connect } from 'react-redux'
import { getRecipeSelectedSides } from '../../selectors/recipe'
import { VariantRecipeListContainer } from '../../Recipe/VariantRecipeList/VariantRecipeList'

const mapStateToProps = (state, props) => {
  const { sidesModalRecipeId } = props
  const selectedRecipeSide = getRecipeSelectedSides(state, { recipeId: sidesModalRecipeId })

  return {
    originalId: sidesModalRecipeId,
    recipeId: selectedRecipeSide || null,
    variantsType: 'sides'
  }
}

export const RecipeSidesModalVariantRecipeListContainer = connect(mapStateToProps)(VariantRecipeListContainer)
