import React from 'react'
import classNames from 'classnames'
import css from './InfoBadge.css'

const InfoBadge = ({ type = 'span', children, newRecipe, stockInfo, recommended, inverse, ...props }) => {
	const className = classNames(
		css.badge,
		{ [css.newRecipe]: newRecipe },
		{ [css.stockInfo]: stockInfo },
		{ [css.recommended]: recommended },
		{ [css.inverse]: inverse },
	)

	return React.createElement(type, { className, ...props }, children)
}

InfoBadge.propTypes = {
	type: React.PropTypes.string,
	children: React.PropTypes.node,
	newRecipe: React.PropTypes.bool,
	stockInfo: React.PropTypes.bool,
	recommended: React.PropTypes.bool,
	inverse: React.PropTypes.bool,
}

InfoBadge.defaultProps = {
	newRecipe: false,
	stockInfo: false,
	recommended: false,
	inverse: false,
}

export default InfoBadge
