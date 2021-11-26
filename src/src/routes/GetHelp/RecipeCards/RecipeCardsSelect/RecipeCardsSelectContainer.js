import { connect } from 'react-redux'
import { getUserId } from 'selectors/user'
import { RecipeCardsSelect } from './RecipeCardsSelect'
import { getRecipes, getOrderId, getSelectedRecipeCards } from '../../selectors/selectors'
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
