import { connect } from 'react-redux'
import { selectRecipeVariant, trackVariantListDisplay } from 'actions/menu'
import { menuRecipeDetailVisibilityChange } from '../../../actions/menuRecipeDetails'
import { getAlternativesForRecipe, getSidesForRecipe } from '../../../selectors/variants'
import { getRecipeById, getRecipeTitle } from '../../../../../selectors/recipe'
import { getCurrentCollectionId } from '../../../selectors/collections'
import { VariantRecipeList } from './VariantRecipeList'

const mapStateToProps = (state, ownProps) => {
  const recipe = getRecipeById(state, ownProps.recipeId)
  let selectedRecipe = {}
  const recipeVariants = ownProps.variantsType === 'sides'
    ? getSidesForRecipe(state, ownProps)
    : getAlternativesForRecipe(state, ownProps)
  const recipeVariantsArray = recipeVariants ? recipeVariants.toJS() : null

  if (recipe) {
    selectedRecipe = {
      displayName: getRecipeTitle(recipe),
      coreRecipeId: ownProps.recipeId
    }
  }

  return {
    collectionId: getCurrentCollectionId(state),
    recipeVariants: recipeVariantsArray,
    selectedRecipe
  }
}

const VariantRecipeListContainer = connect(mapStateToProps, { selectRecipeVariant, menuRecipeDetailVisibilityChange, trackVariantListDisplay })(VariantRecipeList)

export { VariantRecipeListContainer }
