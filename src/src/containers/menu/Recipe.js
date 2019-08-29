import Immutable from 'immutable'
import { connect } from 'react-redux'
import Recipe from 'Recipe'
import { isNew } from 'utils/recipe'
import { filterRecipeGrouping } from 'actions/filters'
import { getRecipeGroupFilter } from 'selectors/filters'
import { getShortlist } from 'selectors/features'

function mapStateToProps(state, ownProps) {

  return {
    isFoodBrandClickable: !getRecipeGroupFilter(state),
    isNew: isNew(Immutable.fromJS(ownProps)),
    stock: state.menuRecipeStock.getIn([ownProps.id, String(state.basket.get('numPortions'))], 0),
    inBasket: state.basket.hasIn(['recipes', ownProps.id]),
    showRecipeDetailsButton: state.features.getIn(['showRecipeDetailsButton', 'value']),
    showShortlistButton: getShortlist(state),
    isOnMobile: state.request.get('browser') === 'mobile'
  }
}

const RecipeContainer = connect(mapStateToProps, {
  selectFoodBrand: filterRecipeGrouping
})(Recipe)

export default RecipeContainer
