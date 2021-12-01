import { connect } from 'react-redux'
import { getRecipes } from '../selectors/recipesSelectors'
import { trackRecipeCardClick, trackRecipeCardGetInTouchClick } from '../actions/getHelp'
import { RecipeCards } from './RecipeCards.logic'

const mapStateToProps = (state) => ({
  recipes: getRecipes(state),
})

const RecipeCardsContainer = connect(mapStateToProps, {
  trackRecipeCardClick,
  trackRecipeCardGetInTouchClick,
})(RecipeCards)

export {
  RecipeCardsContainer
}
