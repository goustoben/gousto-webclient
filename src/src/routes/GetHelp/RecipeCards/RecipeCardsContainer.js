import { connect } from 'react-redux'
import { getRecipes } from '../selectors/selectors'
import { RecipeCards } from './RecipeCards.logic'
import { trackRecipeCardClick } from "routes/GetHelp/actions/getHelp/trackRecipeCardClick"
import { trackRecipeCardGetInTouchClick } from "routes/GetHelp/actions/getHelp/trackRecipeCardGetInTouchClick"

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
