import { connect } from 'react-redux'
import actions from 'actions'
import { boxSummaryVisibilityChange } from 'actions/boxSummary'
import { RecipeList } from './RecipeList'

const mapStateToProps = (state) => ({
  browser: state.request.get('browser'),
  boxSummaryVisible: state.boxSummaryShow.get('show'),
})

const RecipeListContainer = connect(mapStateToProps, {
  detailVisibilityChange: actions.menuRecipeDetailVisibilityChange,
  boxDetailsVisibilityChange: boxSummaryVisibilityChange,
})(RecipeList)

export { RecipeListContainer }
