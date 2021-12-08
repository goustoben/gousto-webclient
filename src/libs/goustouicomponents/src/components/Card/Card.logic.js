import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { LayoutContentWrapper } from '../LayoutContentWrapper'
import css from './Card.module.css'

const Card = ({
  children,
  className,
  hasLateralBordersOnSmallScreens,
  hasPaddingVertical,
  isVisibleOnSmallScreens,
  paddingSize,
}) => (
  <div
    className={classnames(
      css.card,
      className,
      {
        [css.visibleOnSmallScreens]: isVisibleOnSmallScreens,
        [css.lateralBordersOnSmallScreens]: hasLateralBordersOnSmallScreens,
      },
    )}
  >
    <LayoutContentWrapper
      paddingHorizontalSize={paddingSize}
      paddingVerticalSize={paddingSize}
      paddingVertical={hasPaddingVertical}
    >
      {children}
    </LayoutContentWrapper>
  </div>
)

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hasLateralBordersOnSmallScreens: PropTypes.bool,
  hasPaddingVertical: PropTypes.bool,
  isVisibleOnSmallScreens: PropTypes.bool,
  paddingSize: PropTypes.oneOf(['large', 'large/xlarge']),
}

Card.defaultProps = {
  className: null,
  hasLateralBordersOnSmallScreens: true,
  hasPaddingVertical: true,
  isVisibleOnSmallScreens: true,
  paddingSize: 'large',
}

export { Card }
