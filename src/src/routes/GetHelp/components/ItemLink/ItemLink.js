import React, { PropTypes } from 'react'
import Link from 'Link'

import css from './ItemLink.css'

const ItemLink = ({ label, to, clientRouted }) => (
	<Link to={to} clientRouted={clientRouted} className={css.itemContent}>
		{label}
		<span className={css.itemArrowRight} />
	</Link>
)

ItemLink.propTypes = {
	label: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
	clientRouted: PropTypes.bool,
}

ItemLink.defaultProps = {
	clientRouted: true,
}

export default ItemLink
