import { connect } from 'react-redux'
import { basketRecipeAdd } from 'actions/basket'
import { shortlistRecipeAdd } from 'actions/shortlist'
import { MoveRecipeButton } from './MoveRecipeButton'

const mapDispatchToProps = {
  moveToBox: (recipeId) => basketRecipeAdd(recipeId, 'boxSummary', false),
  moveToShortlist: (recipeId) => shortlistRecipeAdd(recipeId, false, 'boxSummary')
}

const MoveRecipeButtonContainer = connect(null, mapDispatchToProps)(MoveRecipeButton)

export { MoveRecipeButtonContainer }
