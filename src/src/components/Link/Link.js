import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'
import css from './Link.css'

const GoustoLink = (props, context) => {
	let link
	const { noDecoration, secondary, clientRouted, className, ...rest } = props
	const dynamicClasses = {
		[css.noDecor]: noDecoration,
		[css.secondary]: secondary,
	}

	if (context.router && clientRouted) {
		link = <Link className={classnames(css.base, dynamicClasses, className)} {...rest} />
	} else {
		link = <a className={classnames(css.base, dynamicClasses, className)} href={rest.to} {...rest}></a>
	}

	return link
}

GoustoLink.contextTypes = {
	router: React.PropTypes.object,
}

GoustoLink.propTypes = {
	noDecoration: PropTypes.bool,
	to: PropTypes.string,
	clientRouted: PropTypes.bool,
	onClick: PropTypes.func,
}

GoustoLink.defaultProps = {
	clientRouted: true,
}

export default GoustoLink
