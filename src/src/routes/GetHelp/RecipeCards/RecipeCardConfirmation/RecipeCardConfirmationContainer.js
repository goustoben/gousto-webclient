import { connect } from 'react-redux'
import { RecipeCardConfirmation } from './RecipeCardConfirmation'
import { getSelectedAddress } from '../../selectors/addressSelectors'
import { getSelectedRecipeCardsDetails } from '../../selectors/recipesSelectors'
import {
  trackPrintedRecipeCardClickRecipe,
  trackPrintedRecipeCardClickDone,
  trackPrintedRecipeCardClickCookbook,
} from '../../actions/recipeCards'

const mapStateToProps = (state) => ({
  selectedAddress: getSelectedAddress(state),
  recipeCardsDetails: getSelectedRecipeCardsDetails(state)
})

const RecipeCardConfirmationContainer = connect(mapStateToProps, {
  trackPrintedRecipeCardClickRecipe,
  trackPrintedRecipeCardClickDone,
  trackPrintedRecipeCardClickCookbook,
})(RecipeCardConfirmation)

export { RecipeCardConfirmationContainer }
