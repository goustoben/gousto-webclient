import PropTypes from 'prop-types'
import React, { createElement } from 'react'
import css from './ModuleHeader.css'

const ModuleHeader = ({ children, size }) => {
	const type = size === 'big' ? 'h2' : 'h3'
	const headerElement = createElement(type, { className: `${css.header} ${css[size]}` }, children)

	return (
		<div className={css.container}>
			{headerElement}
		</div>
	)
}

ModuleHeader.propTypes = {
	children: PropTypes.node,
	size: PropTypes.oneOf(['big', 'small']),
}

ModuleHeader.defaultProps = {
	size: 'big',
}

export default ModuleHeader
