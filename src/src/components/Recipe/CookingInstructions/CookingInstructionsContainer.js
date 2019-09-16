import { connect } from 'react-redux'
import cookbookActions from 'actions/cookbook'
import { CookingInstructions } from './CookingInstructions'
import { getRecipeSteps } from 'selectors/cookingInstructions'

function mapStateToProps(state, ownProps) {
  return {
    recipeId: ownProps.recipeId,
    recipeStepsById: getRecipeSteps(state, ownProps.recipeId),
  }
}

const CookingInstructionsContainer = connect(mapStateToProps, {
  cookbookLoadRecipeStepsById: cookbookActions.cookbookLoadRecipeStepsById,
})(CookingInstructions)

export { CookingInstructionsContainer }
