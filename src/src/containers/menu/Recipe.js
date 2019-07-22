import Immutable from 'immutable'
import { connect } from 'react-redux'
import Recipe from 'Recipe'
import { isNew } from 'utils/recipe'
import { selectFoodBrand } from 'actions/filters'
import { getFoodBrandFeature } from 'selectors/features'
import { getFoodBrandFilter } from 'selectors/filters'

function mapStateToProps(state, ownProps) {

  return {
    isFoodBrandClickable: getFoodBrandFeature(state) && getFoodBrandFilter(state) === null,
    isNew: isNew(Immutable.fromJS(ownProps)),
    stock: state.menuRecipeStock.getIn([ownProps.id, String(state.basket.get('numPortions'))], 0),
    inBasket: state.basket.hasIn(['recipes', ownProps.id]),
  }
}

const RecipeContainer = connect(mapStateToProps, {
  selectFoodBrand
})(Recipe)

export default RecipeContainer
