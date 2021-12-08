import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './Column.module.css'

export const columnSizes = [1, 2, 3, 4, 6, 12]

const Column = ({
  children,
  hasPaddingSmallScreen,
  hasPaddingMediumScreen,
  hasPaddingLargeScreen,
  smallScreen,
  mediumScreen,
  largeScreen,
  extraClass,
}) => (
  <div
    className={classnames(css.column, css[`colSmall${smallScreen}`],
      {
        [css.paddingSmallScreen]: hasPaddingSmallScreen,
        [css.paddingMediumScreen]: hasPaddingMediumScreen,
        [css.paddingLargeScreen]: hasPaddingLargeScreen,
        [css[`colMedium${mediumScreen}`]]: Boolean(mediumScreen),
        [css[`colLarge${largeScreen}`]]: Boolean(largeScreen),
      }, extraClass)}
  >
    {children}
  </div>
)

Column.propTypes = {
  children: PropTypes.node.isRequired,
  smallScreen: PropTypes.oneOf(columnSizes).isRequired,
  mediumScreen: PropTypes.oneOf(columnSizes),
  largeScreen: PropTypes.oneOf(columnSizes),
  extraClass: PropTypes.string,
  hasPaddingSmallScreen: PropTypes.bool,
  hasPaddingMediumScreen: PropTypes.bool,
  hasPaddingLargeScreen: PropTypes.bool,
}

Column.defaultProps = {
  mediumScreen: null,
  largeScreen: null,
  extraClass: null,
  hasPaddingSmallScreen: true,
  hasPaddingMediumScreen: true,
  hasPaddingLargeScreen: true,
}

export { Column }
