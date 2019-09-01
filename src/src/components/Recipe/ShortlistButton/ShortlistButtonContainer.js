import { connect } from 'react-redux'
import { getShortlistLimitReached, getShortlistRecipeIds } from 'selectors/basket'
import { shortlistRecipeAdd, shortlistRecipeRemove } from 'actions/shortlist'
import { menuBrowseCTAVisibilityChange } from 'actions/menu'
import { ShortlistButton } from './ShortlistButton'

function mapStateToProps(state, ownProps) {
  const { id } = ownProps
  const shortlistIds = getShortlistRecipeIds(state)
  const shorlistKeys = shortlistIds.keySeq().toArray()
  const recipeInShortlist = shortlistIds && shorlistKeys.find(recipeId => recipeId === id)

  return {
    shortlistLimitReached: getShortlistLimitReached(state),
    recipeInShortlist: Boolean(recipeInShortlist)
  }
}

const ShortlistButtonContainer = connect(mapStateToProps, {
  addToShortlist: shortlistRecipeAdd,
  removeFromShortlist: shortlistRecipeRemove,
  menuBrowseCTAVisibilityChange,
})(ShortlistButton)

export { ShortlistButtonContainer }
