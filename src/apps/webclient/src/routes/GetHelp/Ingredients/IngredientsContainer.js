import { connect } from 'react-redux'
import {
  storeSelectedIngredients,
} from 'actions/getHelp'
import {
  trackDeselectIngredient,
  trackSelectIngredient,
  validateLatestOrder,
} from '../actions/getHelp'
import { validateSelectedIngredients } from '../actions/validateSelectedIngredients'
import {
  getIsOrderValidationPending,
  getIsOrderValidationError,
  getIsMultiComplaintLimitReachedLastFourWeeks,
  getIsBoxDailyComplaintLimitReached
} from '../selectors/orderSelectors'
import {
  getMassIssueIneligibleIngrsByRecipeGRMap,
  getOrder,
  getHasRepetitiveIssues,
} from '../selectors/selectors'
import { getRecipes } from '../selectors/recipesSelectors'
import { Ingredients } from './Ingredients.logic'

const mapStateToProps = (state) => ({
  massIssueIneligibleIngrsByRecipeGRMap: getMassIssueIneligibleIngrsByRecipeGRMap(state),
  isOrderValidationError: getIsOrderValidationError(state),
  isMultiComplaintLimitReachedLastFourWeeks: getIsMultiComplaintLimitReachedLastFourWeeks(state),
  isBoxDailyComplaintLimitReached: getIsBoxDailyComplaintLimitReached(state),
  isValidateOrderLoading: getIsOrderValidationPending(state),
  hasRepetitiveIssues: getHasRepetitiveIssues(state),
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
