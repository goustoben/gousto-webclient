import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'

import { H2 } from 'components/Page/Header'
import CollectionItem from 'CollectionItem'
import FilterItem from 'routes/Menu/FilterMenu/FilterItem'
import Svg from 'Svg'
import css from '../../FilterTag/FilterTag.css'

const CollectionFilter = ({ collections, filterCollectionChange, currentCollectionId }) => (
	<div>
		<H2 size="XL2" headlineFont={false}>Category</H2>
		{collections.map((collection, index) => {
			const collectionId = collection.get('id')

			return (
				<FilterItem
					type="radio"
					groupName="collection"
					value={collectionId}
					identifier={`collectionfilter-${index}`}
					checked={currentCollectionId === collectionId}
					onClick={() => { filterCollectionChange(collectionId) }}
				>
					<CollectionItem
						count={null}
						showCount={false}
						dataId={collectionId}
						identifier={`collectionfilter-${collectionId}`}
						collectionId={collectionId}
					>
						{collection.get('slug') === 'recommendations' ? <span>Just For You </span> : <span>{collection.get('shortTitle', '')}</span> }
						{collection.get('slug') === 'recommendations' && <Svg className={css.filterTagHeart} fileName="icon-heart" />}
					</CollectionItem>
				</FilterItem>
			)
		}
	)}
	</div>
)

CollectionFilter.propTypes = {
	collections: PropTypes.instanceOf(Immutable.Map),
	filterCollectionChange: PropTypes.func,
	currentCollectionId: PropTypes.string,
}

CollectionFilter.defaultProps = {
	collections: Immutable.Map(),
	filterCollectionChange: () => {},
}

export default CollectionFilter
