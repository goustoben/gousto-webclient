import { connect } from 'react-redux'
import { trackMassIssueAlertDisplayed } from '../../actions/getHelp'
import { RecipeIngredients } from './RecipeIngredients'

const RecipeIngredientsContainer = connect(null, {
  trackMassIssueAlertDisplayed
})(RecipeIngredients)

export { RecipeIngredientsContainer }
