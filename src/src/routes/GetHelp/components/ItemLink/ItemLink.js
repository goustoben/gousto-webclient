import React from 'react'
import PropTypes from 'prop-types'

import Link from 'Link'

import Item from '../Item'

const ItemLink = ({ label, trackClick, isHiddenOnMobile, to, clientRouted }) => (
	<Link to={to} clientRouted={clientRouted}>
		<Item
			label={label}
			trackClick={trackClick}
			isHiddenOnMobile={isHiddenOnMobile}
		/>
	</Link>
)

ItemLink.propTypes = {
	label: PropTypes.string.isRequired,
	trackClick: PropTypes.func,
	isHiddenOnMobile: PropTypes.bool,
	to: PropTypes.string.isRequired,
	clientRouted: PropTypes.bool,
}

ItemLink.defaultProps = {
	trackClick: () => {},
	isHiddenOnMobile: false,
	clientRouted: true,
}

export default ItemLink
