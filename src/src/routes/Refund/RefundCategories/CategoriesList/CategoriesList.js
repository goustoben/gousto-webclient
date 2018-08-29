import React from 'react'
import { CategoriesListItem } from './CategoriesListItem'

import css from './CategoriesList.css'

export const CategoriesList = ({ categories, orderIssueSelected }) => (
	<ul className={css.categoriesList}>
		{categories.map((category) => (
			<CategoriesListItem
				key={`refund-item-${category.slug}`}
				label={category.name}
				to={category.url}
				onClick={() => orderIssueSelected(category.slug)}
			/>
		))}
	</ul>
)
