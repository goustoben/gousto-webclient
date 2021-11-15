import { connect } from 'react-redux'
import { RecipesPerBoxStep } from './RecipesPerBoxStep'
import { basketSetNumRecipes } from "actions/basket/basketSetNumRecipes"
import { trackSignupWizardAction } from "actions/signup/trackSignupWizardAction"

const mapDispatchToProps = {
  basketSetNumRecipes,
  trackSignupWizardAction,
}

const RecipesPerBoxStepContainer = connect(null, mapDispatchToProps)(RecipesPerBoxStep)

export { RecipesPerBoxStepContainer }
