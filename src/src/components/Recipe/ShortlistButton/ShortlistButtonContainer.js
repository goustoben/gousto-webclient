import { connect } from 'react-redux'
import { getShortlistLimitReached, getShortlistRecipeIds, getNumPortions } from 'selectors/basket'
import { getStock } from 'selectors/root'
import { shortlistRecipeAdd, shortlistRecipeRemove } from 'actions/shortlist'
import { menuBrowseCTAVisibilityChange } from 'actions/menu'
import { incrementTutorialViewed, tutorialTracking } from 'actions/tutorial'
import { getShortlistTutorialFirstStep } from 'selectors/tutorial'

import { ShortlistButton } from './ShortlistButton'

function mapStateToProps(state, ownProps) {
  const { id, showShortlistFirstStep } = ownProps
  const shortlistIds = getShortlistRecipeIds(state)
  const shortlistKeys = shortlistIds.keySeq().toArray()
  const recipeInShortlist = shortlistIds && shortlistKeys.find(recipeId => recipeId === id)
  const shortlistTutorialStep1Viewed = !!getShortlistTutorialFirstStep(state)
  const stock = getStock(state)
  const numPortions = getNumPortions(state)
  const notInStock = !stock.getIn([id, String(numPortions)])

  return {
    shortlistLimitReached: getShortlistLimitReached(state),
    recipeInShortlist: Boolean(recipeInShortlist),
    showShortListTutorial: !shortlistTutorialStep1Viewed && showShortlistFirstStep,
    shortlistTutorialStep1Viewed,
    notInStock,
  }
}

const ShortlistButtonContainer = connect(mapStateToProps, {
  addToShortlist: shortlistRecipeAdd,
  removeFromShortlist: shortlistRecipeRemove,
  menuBrowseCTAVisibilityChange,
  incrementTutorialViewed,
  tutorialTracking
})(ShortlistButton)

export { ShortlistButtonContainer }
