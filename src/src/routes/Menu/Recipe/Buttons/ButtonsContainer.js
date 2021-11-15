import { connect } from 'react-redux'
import { getSurcharge, getSurchargePerPortion } from 'utils/recipe'
import { getBasketPostcode } from '../../../../selectors/basket'
import Buttons from './Buttons'
import { recipeVariantDropdownExpanded } from "actions/menu/recipeVariantDropdownExpanded"
import { menuBrowseCTAVisibilityChange } from "actions/menu/menuBrowseCTAVisibilityChange"
import { basketRecipeAdd } from "routes/Menu/actions/basketRecipes/basketRecipeAdd"
import { basketRecipeRemove } from "routes/Menu/actions/basketRecipes/basketRecipeRemove"
import { menuRecipeDetailVisibilityChange } from "routes/Menu/actions/menuRecipeDetails/menuRecipeDetailVisibilityChange"

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
  }
}

const ButtonsContainer = connect(mapStateToProps, {
  onAdd: basketRecipeAdd,
  onRemove: basketRecipeRemove,
  menuRecipeDetailVisibilityChange,
  menuBrowseCTAVisibilityChange,
  recipeVariantDropdownExpanded,
})(Buttons)

export default ButtonsContainer
