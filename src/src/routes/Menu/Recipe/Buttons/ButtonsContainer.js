import { connect } from 'react-redux'
import actions from 'actions'
import { getSurcharge, getSurchargePerPortion } from 'utils/recipe'
import { basketRecipeAdd, basketRecipeRemove } from '../../actions/basketRecipes'
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
  }
}

const ButtonsContainer = connect(mapStateToProps, {
  onAdd: basketRecipeAdd,
  onRemove: basketRecipeRemove,
  menuRecipeDetailVisibilityChange: actions.menuRecipeDetailVisibilityChange,
  menuBrowseCTAVisibilityChange: actions.menuBrowseCTAVisibilityChange,
})(Buttons)

export default ButtonsContainer
