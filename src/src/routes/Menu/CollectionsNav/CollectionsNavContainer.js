import CollectionsNav from './CollectionsNav'
import { connect } from 'react-redux'
import actions from 'actions'

function mapStateToProps(state) {
  return {
    menuCollections: state.menuCollections
      .filter(collection => state.menuCollectionRecipes.get(collection.get('id'), []).size > 0)
      .filter(collection => (state.features.getIn(['unpubCollections', 'value']) && !state.features.getIn(['forceCollections', 'value'])) || collection.get('published')),
    features: state.features,
  }
}

const CollectionsNavContainer = connect(mapStateToProps, {
  collectionFilterChange: actions.collectionFilterChange,
  featureSet: actions.featureSet,
})(CollectionsNav)

export default CollectionsNavContainer
