import React from 'react'
import PropTypes from 'prop-types'

import NewItem from '../NewItem'

const ItemExecutable = ({ label, trackClick, isHiddenOnMobile, onClick }) => (
	<div onClick={onClick}>
		<NewItem
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
