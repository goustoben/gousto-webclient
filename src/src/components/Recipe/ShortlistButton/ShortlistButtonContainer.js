import { connect } from 'react-redux'
import { getShortlist } from 'selectors/features'
import { getShortlistLimitReached } from 'selectors/basket'
import { shortlistRecipeAdd, shortlistRecipeRemove } from 'actions/shortlist'
import { menuBrowseCTAVisibilityChange } from 'actions/menu'
import { ShortlistButton } from './ShortlistButton'

function mapStateToProps(state) {

  return {
    showShortlistButton: getShortlist(state),
    shortlistLimitReached: getShortlistLimitReached(state)
  }
}

const ShortlistButtonContainer = connect(mapStateToProps, {
  addToShortlist: shortlistRecipeAdd,
  removeFromShortlist: shortlistRecipeRemove,
  menuBrowseCTAVisibilityChange,
})(ShortlistButton)

export { ShortlistButtonContainer }
