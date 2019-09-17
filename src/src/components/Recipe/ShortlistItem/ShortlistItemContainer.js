import { connect } from 'react-redux'
import actions from 'actions'
import { getOkShortlistRecipeIds } from 'routes/Menu/selectors/basket'
import ShortlistItem from './ShortlistItem'

const mapStateToProps = (state) => ({
  shortlistIds: getOkShortlistRecipeIds(state),
  recipesStore: state.recipes,
})

const ShortlistItemContainer = connect(mapStateToProps, {
  onShortlistRemove: actions.shortlistRecipeRemove,
})(ShortlistItem)

export default ShortlistItemContainer
