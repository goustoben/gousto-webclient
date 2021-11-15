import { connect } from 'react-redux'
import { getBrowserType } from 'selectors/browser'
import { RecipeList } from './RecipeList'
import { getBasketRecipeWithSidesBaseId } from '../../selectors/recipeList'
import { boxSummaryVisibilityChange } from "actions/boxSummary/boxSummaryVisibilityChange"
import { menuRecipeDetailVisibilityChange } from "routes/Menu/actions/menuRecipeDetails/menuRecipeDetailVisibilityChange"

const mapStateToProps = (state) => ({
  browser: getBrowserType(state),
  boxSummaryVisible: state.boxSummaryShow.get('show'),
  recipes: getBasketRecipeWithSidesBaseId(state)
})

const RecipeListContainer = connect(mapStateToProps, {
  detailVisibilityChange: menuRecipeDetailVisibilityChange,
  boxDetailsVisibilityChange: boxSummaryVisibilityChange,
})(RecipeList)

export { RecipeListContainer }
