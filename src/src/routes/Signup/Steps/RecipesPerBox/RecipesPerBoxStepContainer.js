import { connect } from 'react-redux'
import { basketSetNumRecipes } from 'actions/basket'
import { RecipesPerBoxStep } from './RecipesPerBoxStep'

const mapDispatchToProps = {
  basketSetNumRecipes,
}

const RecipesPerBoxStepContainer = connect(null, mapDispatchToProps)(RecipesPerBoxStep)

export { RecipesPerBoxStepContainer }
