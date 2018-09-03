import React from 'react'
import { Item } from './Item'

import css from './List.css'

export const List = ({ categories, orderIssueSelected }) => (
	<ul className={css.list}>
		{categories.map((category) => (
			<Item
				key={`list-${category.slug}`}
				label={category.name}
				to={category.url}
				onClick={() => orderIssueSelected(category.slug)}
			/>
		))}
	</ul>
)
