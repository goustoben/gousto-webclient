import React, { PropTypes } from 'react'
import Link from 'Link'

import css from './Item.css'

const Item = ({ label, to, clientRouted, onClick }) => (
	<li className={css.item} onClick={onClick}>
		<Link to={to} clientRouted={clientRouted} className={css.itemLink}>
			{label}
			<span className={css.itemArrowRight} />
		</Link>
	</li>
)

Item.propTypes = {
	label: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
	clientRouted: PropTypes.bool,
	onClick: PropTypes.func,
}

Item.defaultProps = {
	onClick: () => {},
}

export default Item
