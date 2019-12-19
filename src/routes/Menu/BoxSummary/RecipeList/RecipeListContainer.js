import { connect } from 'react-redux'
import actions from 'actions'
import RecipeList from './RecipeList'

const mapStateToProps = (state) => ({
  browser: state.request.get('browser'),
  boxSummaryVisible: state.boxSummaryShow.get('show'),
})

const RecipeListContainer = connect(mapStateToProps, {
  detailVisibilityChange: actions.menuRecipeDetailVisibilityChange,
  boxDetailsVisibilityChange: actions.boxSummaryVisibilityChange,
})(RecipeList)

export default RecipeListContainer
