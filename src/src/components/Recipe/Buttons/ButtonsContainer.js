import { connect } from 'react-redux'
import actions from 'actions'
import Buttons from './Buttons'

function mapStateToProps(state, props) {
  return {
    qty: state.basket.getIn(['recipes', props.recipeId], 0),
    numPortions: state.basket.get('numPortions'),
    limitReached: state.basket.get('limitReached'),
    disable: state.auth.get('isAdmin'),
    score: props.score,
  }
}

const ButtonsContainer = connect(mapStateToProps, {
  onAdd: actions.basketRecipeAdd,
  onRemove: actions.basketRecipeRemove,
  menuRecipeDetailVisibilityChange: actions.menuRecipeDetailVisibilityChange,
  menuBrowseCTAVisibilityChange: actions.menuBrowseCTAVisibilityChange,
})(Buttons)

export default ButtonsContainer
