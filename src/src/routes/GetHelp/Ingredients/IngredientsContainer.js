import { connect } from 'react-redux'
import {
  getIsOrderValidationPending,
  getIsOrderValidationError,
  getIsMultiComplaintLimitReachedLastFourWeeks,
  getIsBoxDailyComplaintLimitReached
} from '../selectors/orderSelectors'
import { getMassIssueIneligibleIngredientUuids, getOrder, getRecipes } from '../selectors/selectors'
import { Ingredients } from './Ingredients.logic'
import { storeSelectedIngredients } from "actions/getHelp/storeSelectedIngredients"
import { validateSelectedIngredients } from "actions/getHelp/validateSelectedIngredients"
import { trackSelectIngredient } from "routes/GetHelp/actions/getHelp/trackSelectIngredient"
import { trackDeselectIngredient } from "routes/GetHelp/actions/getHelp/trackDeselectIngredient"
import { validateLatestOrder } from "routes/GetHelp/actions/getHelp/validateLatestOrder"

const mapStateToProps = (state) => ({
  massIssueIneligibleIngredientUuids: getMassIssueIneligibleIngredientUuids(state),
  isOrderValidationError: getIsOrderValidationError(state),
  isMultiComplaintLimitReachedLastFourWeeks: getIsMultiComplaintLimitReachedLastFourWeeks(state),
  isBoxDailyComplaintLimitReached: getIsBoxDailyComplaintLimitReached(state),
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
