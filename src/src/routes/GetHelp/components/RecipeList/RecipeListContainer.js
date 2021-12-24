import { connect } from 'react-redux'
import { trackRecipeCardClick } from '../../actions/getHelp'
import { RecipeList } from './RecipeList.logic'

const RecipeListContainer = connect(null, {
  trackRecipeCardClick,
})(RecipeList)

export {
  RecipeListContainer
}
