import { connect } from 'react-redux'
import { boxSummaryVisibilityChange } from 'actions/boxSummary'
import { getBrowserType } from 'selectors/browser'
import { menuRecipeDetailVisibilityChange } from '../../../actions/menuRecipeDetails'
import { getBasketRecipeWithSidesBaseId } from '../../../selectors/recipeList'
import { RecipeList } from './RecipeList'

const mapStateToProps = (state) => ({
  browser: getBrowserType(state),
  boxSummaryVisible: state.boxSummaryShow.get('show'),
  recipes: getBasketRecipeWithSidesBaseId(state),
})

const RecipeListContainer = connect(mapStateToProps, {
  detailVisibilityChange: menuRecipeDetailVisibilityChange,
  boxDetailsVisibilityChange: boxSummaryVisibilityChange,
})(RecipeList)

export { RecipeListContainer }
