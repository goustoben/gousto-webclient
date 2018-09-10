import React, { PropTypes } from 'react'
import Item from './Item'

import css from './List.css'

const List = ({ items, trackItemSelected }) => (
	<ul className={css.list}>
		{items.map((item) => (
			<Item
				key={`list-${item.slug}`}
				label={item.name}
				to={item.url}
				clientRouted={item.clientRouted}
				expandableContent={item.expandableContent}
				isHiddenOnMobile={item.isHiddenOnMobile}
				customOnClick={item.onClick}
				onClick={() => trackItemSelected(item.slug)}
			/>
		))}
	</ul>
)

List.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			slug: PropTypes.string.isRequired,
		})
	),
	trackItemSelected: PropTypes.func,
}

List.defaultProps = {
	items: [],
	trackItemSelected: () => {},
}

export default List
