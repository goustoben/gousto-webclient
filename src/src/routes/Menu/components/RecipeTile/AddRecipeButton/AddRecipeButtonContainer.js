import { connect } from 'react-redux'
import { recipeVariantDropdownExpanded } from 'actions/menu'
import { getBasketTotalRecipes , getBasketPostcode } from 'selectors/basket'
import { AddRecipeButton } from './AddRecipeButton'
import { basketRecipeAddAttempt, basketRecipeRemove } from '../../../actions/basketRecipes'
import { getRecipeIdInBasket } from '../../../selectors/recipe'
import { getRecipeButtonProps } from './recipeButtonPropsSelector'
import { getVariantsForRecipe } from '../../../selectors/variants'

const mapStateToProps = (state, ownProps) => {
  const isInBasket = getRecipeIdInBasket(state, ownProps)
  const buttonProps = getRecipeButtonProps(state, ownProps)
  const hasBasketPostcode = Boolean(getBasketPostcode(state))

  return {
    isInBasket,
    isBasketLimitReached: getBasketTotalRecipes(state) === 4,
    buttonProps,
    recipeVariants: getVariantsForRecipe(state, ownProps),
    hasBasketPostcode
  }
}
const mapDispatchToProps = {
  basketRecipeAddAttempt,
  basketRecipeRemove,
  recipeVariantDropdownExpanded
}

export const AddRecipeButtonContainer = connect(mapStateToProps, mapDispatchToProps)(AddRecipeButton)
