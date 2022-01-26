import { connect } from 'react-redux'
import { RecipeCardsSelect } from './RecipeCardsSelect'
import { getRecipes, getSelectedRecipeCards } from '../../selectors/recipesSelectors'
import { trackContinueToRecipeCardsIssues, setSelectedRecipeCards } from '../../actions/recipeCards'
import { checkRecipeCardsEligibility } from '../../actions/checkRecipeCardsEligibility'
import { actionTypes } from '../../actions/actionTypes'

const mapStateToProps = (state) => ({
  recipes: getRecipes(state),
  selectedRecipeCards: getSelectedRecipeCards(state),
  isRequestPending: state.pending.get(actionTypes.GET_HELP_CHECK_RECIPE_CARDS_ELIGIBILITY, false),
})

const RecipeCardsSelectContainer = connect(mapStateToProps, {
  checkRecipeCardsEligibility,
  setSelectedRecipeCards,
  trackContinueToRecipeCardsIssues
})(RecipeCardsSelect)

export {
  RecipeCardsSelectContainer
}
