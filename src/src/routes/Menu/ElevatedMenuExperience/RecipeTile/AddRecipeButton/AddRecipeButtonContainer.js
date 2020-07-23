import { connect } from 'react-redux'
import { getBasketTotalRecipes } from 'selectors/basket'
import { AddRecipeButton } from './AddRecipeButton'
import { basketRecipeAdd, basketRecipeRemove } from '../../../actions/basketRecipes'
import { getRecipeIdInBasket } from '../../../selectors/recipe'
import { getRecipeButtonProps } from './recipeButtonPropsSelector'

const mapStateToProps = (state, ownProps) => ({
  isInBasket: getRecipeIdInBasket(state, ownProps),
  isBasketLimitReached: getBasketTotalRecipes(state) === 4,
  basketProps: getRecipeButtonProps(state, ownProps)

})
const mapDispatchToProps = {
  basketRecipeAdd,
  basketRecipeRemove
}

export const AddRecipeButtonContainer = connect(mapStateToProps, mapDispatchToProps)(AddRecipeButton)
