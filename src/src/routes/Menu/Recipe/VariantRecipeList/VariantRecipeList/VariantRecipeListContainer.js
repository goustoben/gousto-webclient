import { connect } from 'react-redux'
import { selectRecipeVariant, trackVariantListDisplay } from 'actions/menu'
import { menuRecipeDetailVisibilityChange } from '../../../actions/menuRecipeDetails'
import { getVariantsForRecipe } from '../../../selectors/variants'
import { getRecipeById, getRecipeTitle } from '../../../../../selectors/recipe'
import { getCurrentCollectionId } from '../../../selectors/collections'
import { VariantRecipeList } from './VariantRecipeList'

const mapStateToProps = (state, ownProps) => {
  const recipe = getRecipeById(state, ownProps.recipeId)
  let selectedRecipe = {}

  if (recipe) {
    selectedRecipe = {
      displayName: getRecipeTitle(recipe),
      coreRecipeId: ownProps.recipeId
    }
  }

  return {
    collectionId: getCurrentCollectionId(state),
    recipeVariants: getVariantsForRecipe(state, ownProps),
    selectedRecipe
  }
}

const VariantRecipeListContainer = connect(mapStateToProps, { selectRecipeVariant, menuRecipeDetailVisibilityChange, trackVariantListDisplay })(VariantRecipeList)

export { VariantRecipeListContainer }
