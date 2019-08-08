import Immutable from 'immutable'
import { connect } from 'react-redux'
import Recipe from 'Recipe'
import { isNew } from 'utils/recipe'
import { filterRecipeGrouping } from 'actions/filters'
import { getFoodBrandFeature } from 'selectors/features'
import { getRecipeGroupFilter } from 'selectors/filters'

function mapStateToProps(state, ownProps) {

  return {
    isFoodBrandClickable: getFoodBrandFeature(state) && !getRecipeGroupFilter(state),
    isNew: isNew(Immutable.fromJS(ownProps)),
    stock: state.menuRecipeStock.getIn([ownProps.id, String(state.basket.get('numPortions'))], 0),
    inBasket: state.basket.hasIn(['recipes', ownProps.id]),
  }
}

const RecipeContainer = connect(mapStateToProps, {
  selectFoodBrand: filterRecipeGrouping
})(Recipe)

export default RecipeContainer
