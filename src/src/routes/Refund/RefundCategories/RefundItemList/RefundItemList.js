import React from 'react'
import Link from 'Link'

import css from './RefundItemList.css'

export const RefundItem = ({ label, to }) => (
	<li className={css.refundItem}>
		<Link to={to} clientRouted={false} className={css.refundItemLink}>
			{label}
			<span className={css.ItemArrowRight} />
		</Link>
	</li>
)

export const RefundItemList = ({ categories }) => (
	<ul className={css.refundItemList}>
		{categories.map((category, key) => (
			<RefundItem key={`refund-item-${key}`} label={category.name} to={category.url} />
		))}
	</ul>
)
