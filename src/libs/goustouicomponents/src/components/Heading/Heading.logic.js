import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import typography from 'design-language/typography.module.css'
import css from './Heading.module.css'

const headingAvailableSizes = ['_legacy_medium', '_legacy_large', '_legacy_xLarge', 'fontStyleM', 'fontStyleL', 'fontStyleXL', 'fontStyle2XL', 'fontStyle3XL', 'fontStyle4XL']
const headingAvailableTypes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
const propTypes = {
  children: PropTypes.node.isRequired,
  isCenter: PropTypes.bool,
  hasMargin: PropTypes.bool,
  size: PropTypes.oneOf(headingAvailableSizes),
  type: PropTypes.oneOf(headingAvailableTypes),
}

const defaultProps = {
  isCenter: false,
  hasMargin: true,
  size: 'fontStyleXL',
  type: 'h1',
}

const Heading = ({
  children, isCenter, size, type, hasMargin,
}) => {
  const Element = type
  const classes = classnames(
    css.heading,
    css[`heading--${size}`],
    typography[size],
    {
      [css.isCenter]: isCenter,
      [css.hasMargin]: hasMargin,
    },
  )

  return (
    <Element className={classes}>{children}</Element>
  )
}

Heading.propTypes = propTypes
Heading.defaultProps = defaultProps

export {
  Heading,
  headingAvailableSizes,
  headingAvailableTypes,
}
