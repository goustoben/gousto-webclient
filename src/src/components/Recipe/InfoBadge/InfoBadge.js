import PropTypes from 'prop-types'
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
	type: PropTypes.string,
	children: PropTypes.node,
	newRecipe: PropTypes.bool,
	stockInfo: PropTypes.bool,
	recommended: PropTypes.bool,
	inverse: PropTypes.bool,
}

InfoBadge.defaultProps = {
	newRecipe: false,
	stockInfo: false,
	recommended: false,
	inverse: false,
}

export default InfoBadge
