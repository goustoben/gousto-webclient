import React, { PropTypes } from 'react'
import Immutable from 'immutable'

import { H2 } from 'components/Page/Header'
import CollectionItem from 'routes/Menu/CollectionItem'
import FilterItem from 'routes/Menu/FilterMenu/FilterItem'
<<<<<<< HEAD
import Svg from 'Svg'
=======
>>>>>>> adding hearts
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
						showCount={false}
						dataId={collectionId}
						identifier={`collectionfilter-${collectionId}`}
						collectionId={collectionId}
					>
						<span>{collection.get('shortTitle', '')}</span>
<<<<<<< HEAD
						{collection.get('slug') === 'recommendations' && <Svg className={css.filterTagHeart} fileName="icon-heart" />}
=======
						{collection.get('slug') === 'recommendations' && <div className={css.filterTagHeart} />}
>>>>>>> adding hearts
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
