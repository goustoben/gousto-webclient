import { connect } from 'react-redux'
import { Buttons } from './Buttons'
import { basketRecipeAdd } from "routes/Menu/actions/basketRecipes/basketRecipeAdd"
import { basketRecipeRemove } from "routes/Menu/actions/basketRecipes/basketRecipeRemove"

function mapStateToProps(state, props) {
  return {
    qty: state.basket.getIn(['recipes', props.recipeId], 0),
    numPortions: state.basket.get('numPortions'),
    limitReached: state.basket.get('limitReached'),
  }
}

const ButtonsContainer = connect(mapStateToProps, {
  onAdd: basketRecipeAdd,
  onRemove: basketRecipeRemove,
})(Buttons)

export { ButtonsContainer }
