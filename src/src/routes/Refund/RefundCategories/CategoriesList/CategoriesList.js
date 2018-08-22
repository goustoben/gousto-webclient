import React from 'react'
import Link from 'Link'

import css from './CategoriesList.css'

export const CategoriesListItem = ({ label, to }) => (
	<li className={css.categoriesListItem}>
		<Link to={to} clientRouted={false} className={css.listItemLink}>
			{label}
			<span className={css.itemArrowRight} />
		</Link>
	</li>
)

export const CategoriesList = ({ categories }) => (
	<ul className={css.categoriesList}>
		{categories.map((category, key) => (
			<CategoriesListItem key={`refund-item-${key}`} label={category.name} to={category.url} />
		))}
	</ul>
)
