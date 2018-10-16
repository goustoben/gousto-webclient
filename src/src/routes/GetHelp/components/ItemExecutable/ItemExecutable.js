import React from 'react'
import PropTypes from 'prop-types'

import Item from '../Item'

const ItemExecutable = ({ label, trackClick, isHiddenOnMobile, onClick }) => (
	<div onClick={onClick}>
		<Item
			label={label}
			trackClick={trackClick}
			isHiddenOnMobile={isHiddenOnMobile}
		/>
	</div>
)

ItemExecutable.propTypes = {
	label: PropTypes.string.isRequired,
	isHiddenOnMobile: PropTypes.bool,
	trackClick: PropTypes.func,
	onClick: PropTypes.func,
}

ItemExecutable.defaultProps = {
	isHiddenOnMobile: false,
	trackClick: () => {},
	onClick: () => {}
}

export default ItemExecutable
