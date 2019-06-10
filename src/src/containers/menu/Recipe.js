import Immutable from 'immutable'
import { connect } from 'react-redux'
import Recipe from 'Recipe'
import { isNew } from 'utils/recipe'

function mapStateToProps(state, ownProps) {

  return {
    isNew: isNew(Immutable.fromJS(ownProps)),
    stock: state.menuRecipeStock.getIn([ownProps.id, String(state.basket.get('numPortions'))], 0),
    inBasket: state.basket.hasIn(['recipes', ownProps.id]),
  }
}

const RecipeContainer = connect(mapStateToProps, {})(Recipe)

export default RecipeContainer
