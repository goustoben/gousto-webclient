import { connect } from 'react-redux'

import actions from 'actions'
import CollectionFilter from './CollectionFilter'

const mapStateToProps = (state) => ({
	currentCollectionId: state.filters.get('currentCollectionId'),
	collections: state.menuCollections
		.filter(collection => state.menuCollectionRecipes.get(collection.get('id'), []).size > 0)
		.filter(collection => (state.features.getIn(['unpubCollections', 'value']) && !state.features.getIn(['forceCollections', 'value'])) || collection.get('published')),
	})

const mapActionsToProps = {
	filterCollectionChange: actions.filterCollectionChange,
}

const CollectionFilterContainer = connect(mapStateToProps, mapActionsToProps)(CollectionFilter)

export default CollectionFilterContainer
