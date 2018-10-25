import React from 'react'
import classNames from 'classnames'
import css from './Info.css'

const Info = ({ type = 'div', children, regular, ...props }) => {
	const className = classNames(
		css.container,
		{ [css.regular]: regular },
	)

	return React.createElement(type, { className, ...props }, children)
}

Info.propTypes = {
	type: React.PropTypes.string,
	children: React.PropTypes.node,
	regular: React.PropTypes.bool,
}

Info.defaultProps = {
	regular: false,
}

export default Info
