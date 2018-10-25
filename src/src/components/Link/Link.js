import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'
import css from './Link.css'

const GoustoLink = (props, context) => {
	let link
	const { noDecoration, secondary, clientRouted, className, ...rest } = props
	const dynamicClasses = {
		[css.base]: !className,
		[css.noDecor]: noDecoration,
		[css.secondary]: secondary,
	}

	if (context.router && clientRouted) {
		link = <Link className={classnames(dynamicClasses, className)} {...rest} />
	} else {
		link = <a className={classnames(dynamicClasses, className)} href={rest.to} {...rest}></a>
	}

	return link
}

GoustoLink.contextTypes = {
	router: PropTypes.object,
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
