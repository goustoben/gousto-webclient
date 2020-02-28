import { connect } from 'react-redux'
import { collectionFilterChange } from 'actions/filters'
import { getCurrentCollectionId } from 'selectors/filters'
import { getMenuRecipes } from 'selectors/root'
import { getMenuCollectionsWithRecipes } from '../../selectors/filters'
import { VerticalCollectionsNav } from './VerticalCollectionsNav'

const mapStateToProps = (state) => ({
  menuCollections: getMenuCollectionsWithRecipes(state),
  menuCollectionRecipes: getMenuRecipes(state),
  menuCurrentCollectionId: getCurrentCollectionId(state)
})

const VerticalCollectionsNavContainer = connect(mapStateToProps, {
  collectionFilterChange
})(VerticalCollectionsNav)

export { VerticalCollectionsNavContainer }

