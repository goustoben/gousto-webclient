import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'
import css from './Link.css'

const GoustoLink = (props, context) => {
	let link
	const { noDecoration, secondary, clientRouted, ...rest } = props
	const className = {
		[css.noDecor]: noDecoration,
	}

	if (context.router && clientRouted) {
		link = <Link className={classnames(css.base, className, { [css.secondary]: secondary })} {...rest} />
	} else {
		link = <a className={classnames(css.base, className, { [css.secondary]: secondary })} href={props.to} {...rest}></a>
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
