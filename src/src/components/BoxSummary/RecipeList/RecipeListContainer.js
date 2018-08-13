import { connect } from 'react-redux'
import actions from 'actions'
import RecipeList from './RecipeList'

const RecipeListContainer = connect(() => ({}), { detailVisibilityChange: actions.menuRecipeDetailVisibilityChange })(RecipeList)

export default RecipeListContainer
