import { connect } from 'react-redux'
import { trackRecipeCardClick } from '../../actions/getHelp'
import { RecipeLinks } from './RecipeLinks'

const RecipeLinksContainer = connect(null, {
  trackRecipeCardClick,
})(RecipeLinks)

export {
  RecipeLinksContainer
}
