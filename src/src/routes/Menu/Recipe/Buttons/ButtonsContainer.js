import { connect } from 'react-redux'
import actions from 'actions'
import { getSurcharge, getSurchargePerPortion } from 'utils/recipe'
import { menuRecipeDetailVisibilityChange } from '../../actions/menuRecipeDetails'
import { basketRecipeAdd, basketRecipeRemove } from '../../actions/basketRecipes'
import { setSidesModalRecipeId } from '../../actions/menuRecipeSidesModal'
import { getBasketPostcode } from '../../../../selectors/basket'
import { getVariantsForRecipe } from '../../selectors/variants'
import Buttons from './Buttons'

const mapStateToProps = (state, props) => {
  const numPortions = state.basket.get('numPortions')
  const meals = state.recipes.getIn([props.recipeId, 'meals'])
  const overallSurcharge = getSurcharge(meals, numPortions)
  const surchargePerPortion = overallSurcharge ? getSurchargePerPortion(overallSurcharge, numPortions) : null

  return {
    qty: state.basket.getIn(['recipes', props.recipeId], 0),
    numPortions,
    surchargePerPortion,
    limitReached: state.basket.get('limitReached'),
    disable: state.auth.get('isAdmin'),
    score: props.score,
    basketPostcode: getBasketPostcode(state),
    stock: state.menuRecipeStock.getIn([props.recipeId, String(numPortions)], 0),
    recipeVariants: getVariantsForRecipe(state, props)
  }
}

const ButtonsContainer = connect(mapStateToProps, {
  onAdd: basketRecipeAdd,
  onRemove: basketRecipeRemove,
  menuRecipeDetailVisibilityChange,
  menuBrowseCTAVisibilityChange: actions.menuBrowseCTAVisibilityChange,
  setSidesModalRecipeId,
})(Buttons)

export default ButtonsContainer
