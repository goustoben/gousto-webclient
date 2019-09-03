import { connect } from 'react-redux'
import actions from 'actions'
import { getShortlistRecipeIds } from 'selectors/basket'
import ShortlistItem from './ShortlistItem'

const mapStateToProps = (state) => ({
  shortlistIds: getShortlistRecipeIds(state),
  recipesStore: state.recipes,
})

const ShortlistItemContainer = connect(mapStateToProps, {
  onShortlistRemove: actions.shortlistRecipeRemove,
})(ShortlistItem)

export default ShortlistItemContainer
