import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './LayoutContentWrapper.module.css'

const propTypes = {
  children: PropTypes.node.isRequired,
  paddingHorizontal: PropTypes.bool,
  paddingVertical: PropTypes.bool,
  paddingHorizontalSize: PropTypes.oneOf(['medium', 'large', 'large/xlarge']),
  paddingVerticalSize: PropTypes.oneOf(['medium', 'large', 'large/xlarge']),
}

const defaultProps = {
  paddingHorizontal: true,
  paddingVertical: true,
  paddingHorizontalSize: 'medium',
  paddingVerticalSize: 'medium',
}

const propToClassName = {
  medium: {
    horizontal: 'mediumPaddingHorizontal',
    vertical: 'mediumPaddingVertical',
  },
  large: {
    horizontal: 'largePaddingHorizontal',
    vertical: 'largePaddingVertical',
  },
  'large/xlarge': {
    horizontal: 'largeOrXLargePaddingHorizontal',
    vertical: 'largeOrXLargePaddingVertical',
  },
}

const getClassName = (sizeProp, direction) => css[propToClassName[sizeProp][direction]]

const LayoutContentWrapper = ({
  children,
  paddingHorizontal,
  paddingVertical,
  paddingHorizontalSize,
  paddingVerticalSize,
}) => {
  const classes = classnames({
    [getClassName(paddingHorizontalSize, 'horizontal')]: paddingHorizontal,
    [getClassName(paddingVerticalSize, 'vertical')]: paddingVertical,
  })

  return <div className={classes}>{children}</div>
}

LayoutContentWrapper.propTypes = propTypes
LayoutContentWrapper.defaultProps = defaultProps

export { LayoutContentWrapper }
