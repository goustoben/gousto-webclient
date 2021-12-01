import { connect } from 'react-redux'
import { getUserId } from 'selectors/user'
import { RecipeCardsSelect } from './RecipeCardsSelect'
import { getOrderId } from '../../selectors/selectors'
import { getRecipes, getSelectedRecipeCards } from '../../selectors/recipesSelectors'
import { trackContinueToRecipeCardsIssues, setSelectedRecipeCards } from '../../actions/recipeCards'

const mapStateToProps = (state) => ({
  recipes: getRecipes(state),
  orderId: getOrderId(state),
  userId: getUserId(state),
  selectedRecipeCards: getSelectedRecipeCards(state)
})

const RecipeCardsSelectContainer = connect(mapStateToProps, {
  setSelectedRecipeCards,
  trackContinueToRecipeCardsIssues
})(RecipeCardsSelect)

export {
  RecipeCardsSelectContainer
}
