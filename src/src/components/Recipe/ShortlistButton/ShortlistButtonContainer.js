import { connect } from 'react-redux'
import { getShortlistLimitReached, getShortlistRecipeIds } from 'selectors/basket'
import { shortlistRecipeAdd, shortlistRecipeRemove } from 'actions/shortlist'
import { menuBrowseCTAVisibilityChange } from 'actions/menu'
import { incrementTutorialViewed, tutorialTracking } from 'actions/tutorial'
import { ShortlistButton } from './ShortlistButton'

function mapStateToProps(state, ownProps) {
  const { id, showShortListFirstStep } = ownProps
  const { tutorial } = state
  const shortlistIds = getShortlistRecipeIds(state)
  const shortlistKeys = shortlistIds.keySeq().toArray()
  const recipeInShortlist = shortlistIds && shortlistKeys.find(recipeId => recipeId === id)
  const shortlistTutorialStep1Viewed = !!tutorial.getIn(['viewed', 'shortlistStep1'])

  return {
    shortlistLimitReached: getShortlistLimitReached(state),
    recipeInShortlist: Boolean(recipeInShortlist),
    showShortListTutorial: !shortlistTutorialStep1Viewed && showShortListFirstStep,
    shortlistTutorialStep1Viewed
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
