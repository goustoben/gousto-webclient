import React, { PropTypes } from 'react'
import classnames from 'classnames'
import css from './BottomBar.css'

export const BottomBar = ({ children, className }) => (
	<div className={classnames(css.bottomBar, className)}>
		{children}
	</div>
)

BottomBar.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.element,
	]).isRequired,
	className: PropTypes.string,
}

BottomBar.defaultProps = {
	className: '',
}
