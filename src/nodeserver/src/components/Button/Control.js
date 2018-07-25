import React, { PropTypes } from 'react'
import classnames from 'classnames'
import css from './Control.css'

const Control = ({ children, placement }) => (
	<span
		className={classnames(
			css.control,
			{ [css.left]: placement === 'left' },
		)}
	>
		{children}
	</span>
)

Control.propTypes = {
	children: React.PropTypes.node,
	placement: PropTypes.oneOf(['left', 'right']),
}

Control.defaultProps = {
	placement: 'right',
}

export default Control
