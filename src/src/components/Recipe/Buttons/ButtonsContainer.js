import { connect } from 'react-redux'
import actions from 'actions'
import { getSurcharge, getSurchargePerPortion } from 'utils/recipe'
import { getShortlist } from 'selectors/features'
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
    changeTextForShortlistExperiment: getShortlist(state) && state.request.get('browser') === 'mobile',
  }
}

const ButtonsContainer = connect(mapStateToProps, {
  onAdd: actions.basketRecipeAdd,
  onRemove: actions.basketRecipeRemove,
  menuRecipeDetailVisibilityChange: actions.menuRecipeDetailVisibilityChange,
  menuBrowseCTAVisibilityChange: actions.menuBrowseCTAVisibilityChange,
})(Buttons)

export default ButtonsContainer
