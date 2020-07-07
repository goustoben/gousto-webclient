import { connect } from 'react-redux'
import actions from 'actions'
import { getDisplayedCollections, getCurrentCollectionId } from '../selectors/collections'
import { CollectionsNav } from './CollectionsNav'

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
  collectionFilterChange: actions.collectionFilterChange,
})(CollectionsNav)

export { CollectionsNavContainer }
