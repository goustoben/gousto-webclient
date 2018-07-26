import { connect } from 'react-redux'
import actions from 'actions'
import Buttons from './Buttons'

function mapStateToProps(state, props) {
	return {
		qty: state.basket.getIn(['recipes', props.recipeId], 0),
		numPortions: state.basket.get('numPortions'),
		limitReached: state.basket.get('limitReached'),
	}
}

const ButtonsContainer = connect(mapStateToProps, {
	onAdd: actions.basketRecipeAdd,
	onRemove: actions.basketRecipeRemove,
})(Buttons)

export default ButtonsContainer
