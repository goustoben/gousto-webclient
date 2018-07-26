import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { spacingPropValidation, getSpacingStyles } from 'styles/spacing'

import typography from 'styles/typography.css'
import colors from 'styles/colors.css'

function Header({ margin, padding, type, size, headlineFont, colorName, children, ...props }) {
	const className = classNames(
		typography[`header${size}`],
		{
			[typography.textBold]: true,
			[typography.headlineFont]: headlineFont,
		},
	)

	const style = {
		color: colors[colorName],
		...getSpacingStyles('margin', margin),
		...getSpacingStyles('padding', padding),
	}

	return React.createElement(type, { className, style, ...props }, children)
}

const propTypes = {
	colorName: PropTypes.string,
	margin: spacingPropValidation,
	padding: spacingPropValidation,
	size: PropTypes.string,
	headlineFont: PropTypes.bool,
	children: PropTypes.node,
}

Header.propTypes = {
	type: PropTypes.string.isRequired,
	...propTypes,
}
Header.defaultProps = {
	margin: {},
	padding: {},
}

const defaultsPropTypes = {
	defaults: PropTypes.oneOf([
		'XL', 'LG', 'MD',
	]),
}

const defaultProps = {
	XL: {
		size: 'XL',
	},
	LG: {
		size: 'LG',
		margin: {
			top: 'MD',
			bottom: 'MD',
		},
	},
	MD: {
		size: 'MD',
	},
}

export const H1 = ({ defaults, ...props }) => Header({ ...Header.defaultProps, ...defaultProps[defaults], ...props, type: 'h1' })
H1.propTypes = { ...defaultsPropTypes, ...propTypes }
H1.defaultProps = { defaults: 'XL' }

export const H2 = ({ defaults, ...props }) => Header({ ...Header.defaultProps, ...defaultProps[defaults], ...props, type: 'h2' })
H2.propTypes = { ...defaultsPropTypes, ...propTypes }
H2.defaultProps = { defaults: 'LG' }

export const H3 = ({ defaults, ...props }) => Header({ ...Header.defaultProps, ...defaultProps[defaults], ...props, type: 'h3' })
H3.propTypes = { ...defaultsPropTypes, ...propTypes }
H3.defaultProps = { defaults: 'MD' }
