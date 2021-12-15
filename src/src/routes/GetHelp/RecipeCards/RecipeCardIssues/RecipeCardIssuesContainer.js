import { connect } from 'react-redux'
import { actionTypes } from '../../actions/actionTypes'
import { RecipeCardIssues } from './RecipeCardIssues'
import { getSelectedRecipeCardsDetails } from '../../selectors/recipesSelectors'
import { setRecipeCardRequestWithIssueReasons, cleanErrorForRecipeCards } from '../../actions/recipeCards'

const mapStateToProps = (state) => ({
  didRequestError: Boolean(state.error.get(actionTypes.GET_HELP_SET_SELECTED_RECIPE_CARDS_ISSUES, null)),
  selectedRecipeCardsDetails: getSelectedRecipeCardsDetails(state),
})

const RecipeCardIssuesContainer = connect(mapStateToProps, {
  setRecipeCardRequestWithIssueReasons,
  cleanErrorForRecipeCards
})(RecipeCardIssues)

export { RecipeCardIssuesContainer }
