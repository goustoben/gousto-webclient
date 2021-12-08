import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './LayoutPageWrapper.module.css'

const propTypes = {
  children: PropTypes.node.isRequired,
  padding: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['large-screens-only']),
  ]),
  size: PropTypes.oneOf(['medium', 'large']),
  testingSelector: PropTypes.string,
}

const defaultProps = {
  padding: true,
  size: 'large',
  testingSelector: null,
}

const LayoutPageWrapper = ({
  children, padding, size, testingSelector,
}) => {
  const classes = classnames(
    css.wrapper,
    css[`${size}Width`],
    {
      [css.paddingHorizontal]: padding === true,
      [css.paddingLargeScreens]: padding === 'large-screens-only',
    },
  )

  return (
    <div className={classes} data-testing={testingSelector}>
      {children}
    </div>
  )
}

LayoutPageWrapper.propTypes = propTypes
LayoutPageWrapper.defaultProps = defaultProps

export {
  LayoutPageWrapper,
}
