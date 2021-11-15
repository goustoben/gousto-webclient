import { connect } from 'react-redux'
import { getCurrentCollectionId, getDisplayedCollections } from '../selectors/collections'
import { CollectionsNav } from './CollectionsNav'
import { collectionFilterChange } from "actions/filters/collectionFilterChange"

function mapStateToProps(state) {
  const collectionId = getCurrentCollectionId(state)

  return {
    menuCollections: getDisplayedCollections(state),
    features: state.features,
    isPolicyAccepted: state.cookies && state.cookies.get('isPolicyAccepted'),
    menuCurrentCollectionId: collectionId
  }
}

const CollectionsNavContainer = connect(mapStateToProps, {
  collectionFilterChange,
})(CollectionsNav)

export { CollectionsNavContainer }
