import { connect } from 'react-redux'
import { getUserId } from 'selectors/user'
import { getRecipes } from '../selectors/recipesSelectors'
import { getOrderId } from '../selectors/selectors'
import { trackClickChoosePrintedRecipeCards } from '../actions/getHelp'
import { RecipeCards } from './RecipeCards.logic'

const mapStateToProps = (state) => ({
  orderId: getOrderId(state),
  recipes: getRecipes(state),
  userId: getUserId(state),
})

const RecipeCardsContainer = connect(mapStateToProps, {
  trackClickChoosePrintedRecipeCards,
})(RecipeCards)

export {
  RecipeCardsContainer
}
