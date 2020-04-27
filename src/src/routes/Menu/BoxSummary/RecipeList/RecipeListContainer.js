import { connect } from 'react-redux'
import { boxSummaryVisibilityChange } from 'actions/boxSummary'
import { menuRecipeDetailVisibilityChange } from '../../actions/menuRecipeDetails'
import { RecipeList } from './RecipeList'

const mapStateToProps = (state) => ({
  browser: state.request.get('browser'),
  boxSummaryVisible: state.boxSummaryShow.get('show'),
})

const RecipeListContainer = connect(mapStateToProps, {
  detailVisibilityChange: menuRecipeDetailVisibilityChange,
  boxDetailsVisibilityChange: boxSummaryVisibilityChange,
})(RecipeList)

export { RecipeListContainer }
