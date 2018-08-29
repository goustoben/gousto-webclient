import React from 'react'
import Link from 'Link'

import css from './CategoriesListItem.css'

export const CategoriesListItem = ({ label, to, onClick }) => (
	<li className={css.categoriesListItem} onClick={onClick}>
		<Link to={to} clientRouted={false} className={css.listItemLink}>
			{label}
			<span className={css.itemArrowRight} />
		</Link>
	</li>
)
