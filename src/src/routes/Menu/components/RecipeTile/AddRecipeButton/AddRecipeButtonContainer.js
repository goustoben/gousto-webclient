import { connect } from 'react-redux'
import { getBasketTotalRecipes } from 'selectors/basket'
import { AddRecipeButton } from './AddRecipeButton'
import { basketRecipeAddAttempt, basketRecipeRemove } from '../../../actions/basketRecipes'
import { getRecipeIdInBasket } from '../../../selectors/recipe'
import { getRecipeButtonProps } from './recipeButtonPropsSelector'

const mapStateToProps = (state, ownProps) => {
  const isInBasket = getRecipeIdInBasket(state, ownProps)
  const buttonProps = getRecipeButtonProps(state, ownProps)

  return {
    isInBasket,
    isBasketLimitReached: getBasketTotalRecipes(state) === 4,
    buttonProps,
  }
}
const mapDispatchToProps = {
  basketRecipeAddAttempt,
  basketRecipeRemove,
}

export const AddRecipeButtonContainer = connect(mapStateToProps, mapDispatchToProps)(AddRecipeButton)
