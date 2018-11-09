import { PropTypes } from 'react'
import Immutable from 'immutable'
import { connect } from 'react-redux'

import CollectionItem from 'CollectionItem'

const mapStateToProps = (state, ownProps) => ({
  count: state.menuCollectionRecipes.get(ownProps.collectionId, Immutable.List([])).size,
})

const CollectionItemContainer = connect(mapStateToProps)(CollectionItem)

CollectionItemContainer.propTypes = {
  collectionId: PropTypes.string.isRequired,
}

export default CollectionItemContainer
