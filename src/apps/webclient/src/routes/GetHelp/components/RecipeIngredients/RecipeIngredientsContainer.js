import { connect } from 'react-redux'
import { trackMassIssueAlertDisplayed } from '../../actions/getHelp'
import { RecipeIngredients } from './RecipeIngredients'
import { getOtherIssueIneligibleIngrsByRecipeGRMap } from '../../selectors/selectors'

const RecipeIngredientsContainer = connect((state) => ({
  otherIssueIneligibleIngrsByRecipeGRMap: getOtherIssueIneligibleIngrsByRecipeGRMap(state),
}), {
  trackMassIssueAlertDisplayed
})(RecipeIngredients)

export { RecipeIngredientsContainer }
