import React, { PropTypes } from 'react'
import classNames from 'classnames'
import css from 'styles/vendor/font-awesome-module.css'

const Icon = ({ name, fixedWidth, size, style, className }) => (
	<span
		className={classNames(css[name], {
			[css['fa-fw']]: fixedWidth,
			[className]: className,
		})}
		style={{ fontSize: size || 'inherit', ...style }}
	></span>
)

Icon.propTypes = {
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
	fixedWidth: PropTypes.bool,
	size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	style: PropTypes.object,
}

Icon.defaultProps = {
	style: {},
}

export default Icon
