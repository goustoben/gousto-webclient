import { connect } from 'react-redux'
import actions from 'actions'
import CollectionsNav from './CollectionsNav'

function mapStateToProps(state) {
  return {
    menuCollections: state.menuCollections
      .filter(collection => state.menuCollectionRecipes.get(collection.get('id'), []).size > 0)
      .filter(collection => collection.get('published')),
    features: state.features,
    menuCollectionRecipes: state.menuCollectionRecipes,
    isPolicyAccepted: state.cookies && state.cookies.get('isPolicyAccepted'),
  }
}

const CollectionsNavContainer = connect(mapStateToProps, {
  collectionFilterChange: actions.collectionFilterChange,
})(CollectionsNav)

export default CollectionsNavContainer
