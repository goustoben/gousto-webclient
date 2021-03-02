import { connect } from 'react-redux'
import actions from 'actions'
import { recipeVariantDropdownExpanded } from 'actions/menu'
import { getSurcharge, getSurchargePerPortion } from 'utils/recipe'
import { menuRecipeDetailVisibilityChange } from '../../actions/menuRecipeDetails'
import { basketRecipeAdd, basketRecipeRemove } from '../../actions/basketRecipes'
import { setSidesModalRecipe } from '../../actions/menuRecipeSidesModal'
import { getBasketPostcode } from '../../../../selectors/basket'
import { getSidesData } from '../../selectors/variants'
import { getRecipeSelectedSides } from '../../selectors/recipe'
import Buttons from './Buttons'

const mapStateToProps = (state, props) => {
  const numPortions = state.basket.get('numPortions')
  const meals = state.recipes.getIn([props.recipeId, 'meals'])
  const overallSurcharge = getSurcharge(meals, numPortions)
  const surchargePerPortion = overallSurcharge ? getSurchargePerPortion(overallSurcharge, numPortions) : null
  const selectedRecipeSide = getRecipeSelectedSides(state, props)

  const {
    recipeVariants,
    hasSides,
    firstSideRecipeId,
    hasSideAddedToBasket,
  } = getSidesData(state, props)
  const recipeIdOrSideRecipeId = hasSideAddedToBasket ? firstSideRecipeId : props.recipeId

  return {
    qty: state.basket.getIn(['recipes', recipeIdOrSideRecipeId], 0),
    numPortions,
    surchargePerPortion,
    limitReached: state.basket.get('limitReached'),
    disable: state.auth.get('isAdmin'),
    score: props.score,
    basketPostcode: getBasketPostcode(state),
    stock: state.menuRecipeStock.getIn([recipeIdOrSideRecipeId, String(numPortions)], 0),
    recipeVariants,
    selectedRecipeSide,
    hasSides,
    hasSideAddedToBasket,
    firstSideRecipeId,
  }
}

const ButtonsContainer = connect(mapStateToProps, {
  onAdd: basketRecipeAdd,
  onRemove: basketRecipeRemove,
  menuRecipeDetailVisibilityChange,
  menuBrowseCTAVisibilityChange: actions.menuBrowseCTAVisibilityChange,
  setSidesModalRecipe,
  recipeVariantDropdownExpanded,
})(Buttons)

export default ButtonsContainer
