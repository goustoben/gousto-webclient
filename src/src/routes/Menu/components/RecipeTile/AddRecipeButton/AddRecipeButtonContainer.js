import { connect } from 'react-redux'
import { recipeVariantDropdownExpanded } from 'actions/menu'
import { getBasketTotalRecipes } from 'selectors/basket'
import { AddRecipeButton } from './AddRecipeButton'
import { basketRecipeAddAttempt, basketRecipeRemove } from '../../../actions/basketRecipes'
import { getRecipeIdInBasket } from '../../../selectors/recipe'
import { getRecipeButtonProps } from './recipeButtonPropsSelector'
import { setSidesModalRecipe } from '../../../actions/menuRecipeSidesModal'
import { getVariantsForRecipe, getSidesData } from '../../../selectors/variants'

const mapStateToProps = (state, ownProps) => {
  const {
    firstSideRecipeId,
    hasSideAddedToBasket,
  } = getSidesData(state, ownProps)
  const isInBasket = getRecipeIdInBasket(state, ownProps)
  const buttonProps = getRecipeButtonProps(state, ownProps)
  const sideAddedToBasketButtonProps = {
    buttonClassName: 'removeButton',
    lineClassName: 'removeButtonLine',
    buttonText: 'Remove recipe',
  }

  let formattedButtonProps = buttonProps

  if (hasSideAddedToBasket) {
    formattedButtonProps = sideAddedToBasketButtonProps
  }

  return {
    isInBasket,
    isBasketLimitReached: getBasketTotalRecipes(state) === 4,
    buttonProps: formattedButtonProps,
    recipeVariants: getVariantsForRecipe(state, ownProps),
    hasSideAddedToBasket,
    firstSideRecipeId
  }
}
const mapDispatchToProps = {
  basketRecipeAddAttempt,
  basketRecipeRemove,
  setSidesModalRecipe,
  recipeVariantDropdownExpanded
}

export const AddRecipeButtonContainer = connect(mapStateToProps, mapDispatchToProps)(AddRecipeButton)
