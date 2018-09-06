import React from 'react'
import Link from 'Link'

import css from './Item.css'

export const Item = ({ label, to, clientRouted, onClick }) => (
	<li className={css.item} onClick={onClick}>
		<Link to={to} clientRouted={clientRouted} className={css.itemLink}>
			{label}
			<span className={css.itemArrowRight} />
		</Link>
	</li>
)
