import { connect } from 'react-redux'
import { basketRecipeAdd, basketRecipeRemove} from '../../../../Menu/actions/basketRecipes'
import Buttons from './Buttons'

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

export default ButtonsContainer
