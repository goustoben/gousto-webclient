import { connect } from 'react-redux'
import { basketSetNumRecipes } from 'actions/basket'
import { trackSignupWizardAction } from 'actions/signup'
import { RecipesPerBoxStep } from './RecipesPerBoxStep'

const mapDispatchToProps = {
  basketSetNumRecipes,
  trackSignupWizardAction,
}

const RecipesPerBoxStepContainer = connect(null, mapDispatchToProps)(RecipesPerBoxStep)

export { RecipesPerBoxStepContainer }
