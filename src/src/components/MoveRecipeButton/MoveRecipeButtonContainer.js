import { connect } from 'react-redux'
import { basketRecipeAdd } from 'actions/basket'
import { shortlistRecipeAdd } from 'actions/shortlist'
import { getBasketLimitReached, getShortlistLimitReached } from 'selectors/basket'
import { MoveRecipeButton } from './MoveRecipeButton'

const mapStateToProps = (state) => ({
  isBasketLimitReached: getBasketLimitReached(state),
  isShortlistLimitReached: getShortlistLimitReached(state)
})

const mapDispatchToProps = {
  moveToBox: (recipeId) => basketRecipeAdd(recipeId, 'boxSummary', false),
  moveToShortlist: (recipeId) => shortlistRecipeAdd(recipeId, false, { view: 'boxSummary' })
}

const MoveRecipeButtonContainer = connect(mapStateToProps, mapDispatchToProps)(MoveRecipeButton)

export { MoveRecipeButtonContainer }
