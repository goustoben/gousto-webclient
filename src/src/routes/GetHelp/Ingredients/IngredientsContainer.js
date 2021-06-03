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
import { getIneligibleIngredientUuids } from '../selectors/selectors'
import { Ingredients } from './Ingredients.logic'

const mapStateToProps = (state) => ({
  ineligibleIngredientUuids: getIneligibleIngredientUuids(state),
  isOrderValidationError: getIsOrderValidationError(state),
  isValidateOrderLoading: getOrderValidationPendingState(state),
  order: state.getHelp.get('order').toJS(),
  recipes: state.getHelp.get('recipes').toJS(),
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
