import Immutable from 'immutable'
import { connect } from 'react-redux'
import { Recipe } from 'routes/Menu/Recipe'
import { push } from 'react-router-redux'
import { isNew } from 'utils/recipe'

const selectFoodBrand = (slug) => push(`/menu/food-brand/${slug}`)

function mapStateToProps(state, ownProps) {
  return {
    isNew: isNew(Immutable.fromJS(ownProps)),
    stock: state.menuRecipeStock.getIn([ownProps.id, String(state.basket.get('numPortions'))], 0),
    inBasket: state.basket.hasIn(['recipes', ownProps.id]),
  }
}

const RecipeContainer = connect(mapStateToProps, { selectFoodBrand })(Recipe)

export default RecipeContainer
