import { connect } from 'react-redux'
import { trackMassIssueAlertDisplayed } from '../../actions/getHelp'
import { RecipeIngredients } from './RecipeIngredients'
import { getOtherIssueIneligibleIngredientUuids } from '../../selectors/selectors'

const RecipeIngredientsContainer = connect((state) => ({
  otherIssueIneligibleIngredientUuids: getOtherIssueIneligibleIngredientUuids(state),
}), {
  trackMassIssueAlertDisplayed
})(RecipeIngredients)

export { RecipeIngredientsContainer }
