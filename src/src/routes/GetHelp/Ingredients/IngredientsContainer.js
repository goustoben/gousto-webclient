import { connect } from 'react-redux'
import {
  validateSelectedIngredients,
  storeSelectedIngredients,
} from 'actions/getHelp'
import { getOrderValidationPendingState, getIsOrderValidationError } from 'selectors/getHelp'
import {
  trackDeselectIngredient,
  trackSelectIngredient,
  validateLatestOrder,
} from '../actions/getHelp'
import { getIneligibleIngredientUuids, getOrder, getRecipes } from '../selectors/selectors'
import { Ingredients } from './Ingredients.logic'

const mapStateToProps = (state) => ({
  ineligibleIngredientUuids: getIneligibleIngredientUuids(state),
  isOrderValidationError: getIsOrderValidationError(state),
  isValidateOrderLoading: getOrderValidationPendingState(state),
  order: getOrder(state),
  recipes: getRecipes(state),
  user: {
    id: state.user.get('id'),
    accessToken: state.auth.get('accessToken'),
  },
})

const IngredientsContainer = connect(mapStateToProps, {
  storeSelectedIngredients,
  trackDeselectIngredient,
  trackSelectIngredient,
  validateLatestOrder,
  validateSelectedIngredients,
})(Ingredients)

export {
  IngredientsContainer
}
