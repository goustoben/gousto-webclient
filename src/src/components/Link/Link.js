import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'
import css from './Link.css'

const GoustoLink = (props, context) => {
	let link
	const { to, noDecoration, secondary, clientRouted, className, ...rest } = props
	const dynamicClasses = {
		[css.noDecor]: noDecoration,
		[css.secondary]: secondary,
	}
	// Delete inButtonSegment from rest as we don't want to pass it to the react-router <Link> component or <a>
	delete rest.inButtonSegment

	if (context.router && clientRouted) {
		link = <Link className={classnames(css.base, dynamicClasses, className)} {...rest} />
	} else {
		link = <a className={classnames(css.base, dynamicClasses, className)} href={to} {...rest}></a>
	}

	return link
}

GoustoLink.contextTypes = {
	router: React.PropTypes.object,
}

GoustoLink.propTypes = {
	noDecoration: PropTypes.bool,
	/* inButtonSegment is used by the <Button> component, to know whether it should render a
	children component within a <Segment> or not */
	inButtonSegment: PropTypes.bool,
	to: PropTypes.string,
	clientRouted: PropTypes.bool,
	onClick: PropTypes.func,
}

GoustoLink.defaultProps = {
	clientRouted: true,
	inButtonSegment: false,
}

export default GoustoLink
