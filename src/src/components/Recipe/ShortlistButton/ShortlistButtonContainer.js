import { connect } from 'react-redux'
import { getShortlistLimitReached, getShortlistRecipeIds } from 'selectors/basket'
import { shortlistRecipeAdd, shortlistRecipeRemove } from 'actions/shortlist'
import { menuBrowseCTAVisibilityChange } from 'actions/menu'
import { incrementTutorialViewed, tutorialTracking } from 'actions/tutorial'
import { getShortlistTutorialFirstStep } from 'selectors/tutorial'
import config from 'config'

import { ShortlistButton } from './ShortlistButton'

function mapStateToProps(state, ownProps) {
  const { id, showShortlistFirstStep, stock } = ownProps
  const shortlistIds = getShortlistRecipeIds(state)
  const shortlistKeys = shortlistIds.keySeq().toArray()
  const recipeInShortlist = shortlistIds && shortlistKeys.find(recipeId => recipeId === id)
  const shortlistTutorialStep1Viewed = !!getShortlistTutorialFirstStep(state)
  const notInStock = stock <= config.menu.stockThreshold && stock !== null

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
