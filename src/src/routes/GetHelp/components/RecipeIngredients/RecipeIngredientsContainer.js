import { connect } from 'react-redux'
import { RecipeIngredients } from './RecipeIngredients'
import { getOtherIssueIneligibleIngredientUuids } from '../../selectors/selectors'
import { trackMassIssueAlertDisplayed } from "routes/GetHelp/actions/getHelp/trackMassIssueAlertDisplayed"

const RecipeIngredientsContainer = connect((state) => ({
  otherIssueIneligibleIngredientUuids: getOtherIssueIneligibleIngredientUuids(state),
}), {
  trackMassIssueAlertDisplayed
})(RecipeIngredients)

export { RecipeIngredientsContainer }
