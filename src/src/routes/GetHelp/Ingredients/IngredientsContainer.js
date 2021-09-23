import { connect } from 'react-redux'
import {
  validateSelectedIngredients,
  storeSelectedIngredients,
} from 'actions/getHelp'
import {
  trackDeselectIngredient,
  trackSelectIngredient,
  validateLatestOrder,
} from '../actions/getHelp'
import { getIsOrderValidationPending, getIsOrderValidationError, getIsMultiComplaintLimitReachedLastFourWeeks } from '../selectors/orderSelectors'
import { getMassIssueIneligibleIngredientUuids, getOrder, getRecipes } from '../selectors/selectors'
import { Ingredients } from './Ingredients.logic'

const mapStateToProps = (state) => ({
  massIssueIneligibleIngredientUuids: getMassIssueIneligibleIngredientUuids(state),
  isOrderValidationError: getIsOrderValidationError(state),
  isMultiComplaintLimitReachedLastFourWeeks: getIsMultiComplaintLimitReachedLastFourWeeks(state),
  isValidateOrderLoading: getIsOrderValidationPending(state),
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
