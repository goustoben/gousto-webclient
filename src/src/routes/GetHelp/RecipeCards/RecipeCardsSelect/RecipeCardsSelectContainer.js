import { connect } from 'react-redux'
import { RecipeCardsSelect } from './RecipeCardsSelect'
import { getRecipes, getSelectedRecipeCards } from '../../selectors/recipesSelectors'
import { trackContinueToRecipeCardsIssues, setSelectedRecipeCards } from '../../actions/recipeCards'
import { checkRecipeCardsEligibility } from '../../actions/checkRecipeCardsEligibility'

const mapStateToProps = (state) => ({
  recipes: getRecipes(state),
  selectedRecipeCards: getSelectedRecipeCards(state)
})

const RecipeCardsSelectContainer = connect(mapStateToProps, {
  checkRecipeCardsEligibility,
  setSelectedRecipeCards,
  trackContinueToRecipeCardsIssues
})(RecipeCardsSelect)

export {
  RecipeCardsSelectContainer
}
