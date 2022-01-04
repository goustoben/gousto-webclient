import { connect } from 'react-redux'
import { RecipeCardsSelect } from './RecipeCardsSelect'
import { getRecipes, getSelectedRecipeCards } from '../../selectors/recipesSelectors'
import { trackContinueToRecipeCardsIssues, setSelectedRecipeCards } from '../../actions/recipeCards'

const mapStateToProps = (state) => ({
  recipes: getRecipes(state),
  selectedRecipeCards: getSelectedRecipeCards(state)
})

const RecipeCardsSelectContainer = connect(mapStateToProps, {
  setSelectedRecipeCards,
  trackContinueToRecipeCardsIssues
})(RecipeCardsSelect)

export {
  RecipeCardsSelectContainer
}
