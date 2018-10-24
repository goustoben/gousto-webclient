import React, { PropTypes } from 'react'
import Immutable from 'immutable'
import routeConfig from 'config/routes'
import { getColSizes } from 'styles/grid'

import { Col, Row } from 'Page/Grid'
import CollectionItem from 'Collection/Item'

const getLink = slug => `${routeConfig.client.cookbook}/${slug}`

const CollectionList = ({ collections, colSizes, ...restProps }) => (
	<Row {...restProps}>
		{collections.map(collection =>
			<Col
				key={collection.get('id')}
				{...getColSizes(colSizes)}
			>
				<CollectionItem
					link={getLink(collection.get('slug'))}
					media={collection.getIn(['media', 'images', 'urls'])}
					title={collection.get('shortTitle')}
				/>
			</Col>
		)}
	</Row>
)

CollectionList.propTypes = {
	collections: PropTypes.instanceOf(Immutable.List),
	colSizes: PropTypes.object,
}

CollectionList.defaultProps = {
	collections: Immutable.List([]),
	colSizes: {},
}

export default CollectionList
