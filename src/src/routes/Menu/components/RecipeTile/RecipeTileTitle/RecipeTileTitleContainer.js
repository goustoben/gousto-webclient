import { connect } from 'react-redux'
import { getRecipeTitle } from '../../../selectors/recipe'
import { RecipeTileTitle } from './RecipeTileTitle'

const mapStateToProps = (state, ownProps) => ({
  title: getRecipeTitle(state, ownProps),
})

const RecipeTileTitleContainer = connect(mapStateToProps)(RecipeTileTitle)

export { RecipeTileTitleContainer }
