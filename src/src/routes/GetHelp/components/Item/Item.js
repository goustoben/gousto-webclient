import React, { PropTypes } from 'react'
import classnames from 'classnames'

import css from './Item.css'

const Item = ({ trackClick, isHiddenOnMobile, children }) => (
	<li
		className={classnames(css.item, { [css.hiddenOnMobile]: isHiddenOnMobile })}
		onClick={trackClick}
	>
		{children}
	</li>
)

Item.propTypes = {
	isHiddenOnMobile: PropTypes.bool,
	trackClick: PropTypes.func,
}

Item.defaultProps = {
	isHiddenOnMobile: false,
	trackClick: () => {},
}

export default Item
