import { connect } from 'react-redux'
import { collectionFilterChange } from 'actions/filters'
import { getDisplayedCollections, getCurrentCollectionId } from '../../selectors/collections'
import { VerticalCollectionsNav } from './VerticalCollectionsNav'

const mapStateToProps = (state) => ({
  menuCollections: getDisplayedCollections(state),
  menuCurrentCollectionId: getCurrentCollectionId(state)
})

const VerticalCollectionsNavContainer = connect(mapStateToProps, {
  collectionFilterChange
})(VerticalCollectionsNav)

export { VerticalCollectionsNavContainer }
