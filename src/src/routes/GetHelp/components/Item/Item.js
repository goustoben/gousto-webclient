import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import css from './Item.css'

const handleClick = (trackClick, onClick) => {
	trackClick()
	onClick()
}

const Item = ({ label, isHiddenOnMobile, trackClick, onClick, arrowExpanded }) => {
	const arrowClass = classnames({
		[css.itemArrowRight]: !arrowExpanded,
		[css.itemArrowDown]: arrowExpanded,
	})

	return (
		<div
			className={classnames(css.item, { [css.hiddenOnMobile]: isHiddenOnMobile })}
			onClick={() => handleClick(trackClick, onClick)}
		>
			<div className={css.itemContent}>
				{label}
				<span className={classnames(arrowClass)} />
			</div>
		</div>
	)
}

Item.propTypes = {
	label: PropTypes.string.isRequired,
	isHiddenOnMobile: PropTypes.bool,
	trackClick: PropTypes.func,
	onClick: PropTypes.func,
	/** If `true` the arrow shows in the style of accordion open */
	arrowExpanded: PropTypes.bool,
}

Item.defaultProps = {
	isHiddenOnMobile: false,
	trackClick: () => {},
	onClick: () => {},
	arrowExpanded: false,
}

export default Item
