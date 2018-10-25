import PropTypes from 'prop-types'
import React from 'react'
import { spacingPropValidation, getSpacingStyles } from 'styles/spacing'

import css from './StyledElement.css'
import borders from 'styles/borders.css'
import colors from 'styles/colors.css'
import effects from 'styles/effects.css'
import overlays from 'styles/overlays.css'
import position from 'styles/position.css'
import typography from 'styles/typography.css'
import layout from 'styles/layout.css'
import bootstrap from 'styles/bootstrap.scss'

const availableClassNames = {
	...borders,
	...effects,
	...overlays,
	...position,
	...typography,
	...layout,
	...bootstrap,
	...css,
}

const globallySupportedProps = [
	'alt',
	'autoComplete',
	'autoFocus',
	'async',
	'controls',
	'data',
	'disabled',
	'form',
	'onChange',
	'onClick',
	'htmlFor',
]

const typeSupportedProps = {
	checkbox: ['checked', 'defaultChecked'],
	input: ['value'],
	option: ['selected'],
	radio: ['checked', 'defaultChecked'],
	textarea: ['value'],
}

export const getSupportedProps = (props = {}, type) => {
	let supportedProps

	Object.keys(props).forEach(propName => {
		if (propName.indexOf('data-') > -1 || propName.indexOf('aria-') > -1 || globallySupportedProps.includes(propName) || (typeSupportedProps[type] && typeSupportedProps[type].includes(propName))) {
			supportedProps = {
				...supportedProps,
				[propName]: props[propName],
			}
		}
	})

	return supportedProps
}

export const mapPropsToClassName = ({ className, ...props } = {}) => {
	const classNames = []

	Object.keys(props).forEach(propName => {
		if (props[propName] === true) {
			if (availableClassNames[propName]) {
				classNames.push(availableClassNames[propName])
			} else {
				classNames.push(propName)
			}
		}
	})

	if (className) {
		classNames.push(className)
	}

	return classNames.join(' ')
}

const StyledElement = ({ backgroundColor, color, children, margin, padding, style, type, ...restProps }) => {
	const className = mapPropsToClassName(restProps)
	const supportedProps = getSupportedProps(restProps, type)

	const styles = {
		color: colors[color],
		backgroundColor: colors[backgroundColor],
		...getSpacingStyles('margin', margin),
		...getSpacingStyles('padding', padding),
		...style,
	}

	return React.createElement(type, { className, style: styles, ...supportedProps }, children)
}

StyledElement.propTypes = {
	backgroundColor: PropTypes.oneOf(Object.keys(colors)),
	color: PropTypes.oneOf(Object.keys(colors)),
	children: PropTypes.node,
	className: PropTypes.string,
	margin: spacingPropValidation,
	padding: spacingPropValidation,
	style: PropTypes.object,
	type: PropTypes.oneOf([
		'aside',
		'checkbox',
		'div',
		'footer',
		'header',
		'input',
		'li',
		'option',
		'p',
		'radio',
		'section',
		'span',
		'svg',
		'textarea',
		'ul',
	]).isRequired,
}

export default StyledElement
