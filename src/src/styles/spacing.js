import PropTypes from 'prop-types'
import spacingStyles from 'styles/spacing.css'

const otherValues = [
	'auto',
	'inherit',
	'initial',
]

export const availableSizes = [
	'Zero', 'XXS', 	'XS',
	'SM', 	'MD', 	'LG',
	'XL', 	'XXL', 	'XXXL',
	...otherValues,
]

export const spacingPropValidation = PropTypes.shape({
	top: PropTypes.oneOf(availableSizes),
	bottom: PropTypes.oneOf(availableSizes),
	right: PropTypes.oneOf(availableSizes),
	left: PropTypes.oneOf(availableSizes),
})

export const getSpacingStyles = (type = 'margin', { top, right, bottom, left } = {}) => ({
	[`${type}Top`]: otherValues.includes(top) ? top : spacingStyles[`Spacing${top}`],
	[`${type}Bottom`]: otherValues.includes(bottom) ? bottom : spacingStyles[`Spacing${bottom}`],
	[`${type}Right`]: otherValues.includes(right) ? right : spacingStyles[`Spacing${right}`],
	[`${type}Left`]: otherValues.includes(left) ? left : spacingStyles[`Spacing${left}`],
})
