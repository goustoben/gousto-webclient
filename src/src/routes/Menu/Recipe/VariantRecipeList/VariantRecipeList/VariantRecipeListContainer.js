import { connect } from 'react-redux'
import { selectRecipeVariant , menuRecipeDetailVisibilityChange } from 'routes/Menu/actions/menuRecipeDetails'
import {
  trackVariantListDisplay,
} from 'actions/menu'
import { getSidesData } from '../../../selectors/variants'
import { getRecipeById, getRecipeTitle } from '../../../../../selectors/recipe'
import { getCategoryIdForVariants } from '../../../selectors/menu'
import { VariantRecipeList } from './VariantRecipeList'

const mapStateToProps = (state, ownProps) => {
  const recipe = getRecipeById(state, ownProps.recipeId)
  const recipeIdProp = ownProps.recipeId
  const categoryIdForVariants = getCategoryIdForVariants(state, ownProps)
  const { recipeVariants } = getSidesData(state, { recipeId: recipeIdProp, categoryId: categoryIdForVariants })
  const recipeVariantsArray = recipeVariants ? recipeVariants.variantsList.toJS() : []

  let selectedRecipe = {}

  if (recipe) {
    selectedRecipe = {
      displayName: getRecipeTitle(recipe),
      coreRecipeId: ownProps.recipeId
    }
  }

  return {
    recipeVariants,
    recipeVariantsArray,
    selectedRecipe
  }
}

const VariantRecipeListContainer = connect(
  mapStateToProps,
  {
    selectRecipeVariant,
    menuRecipeDetailVisibilityChange,
    trackVariantListDisplay,
  }
)(VariantRecipeList)

export { VariantRecipeListContainer }
