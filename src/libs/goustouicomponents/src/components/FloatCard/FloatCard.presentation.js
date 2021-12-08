import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './FloatCard.module.css'
import { CloseIcon } from '../CloseIcon'
import { LayoutPageWrapper } from '../LayoutPageWrapper'

const propTypes = {
  closeIcon: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['small-screens-only']),
  ]).isRequired,
  children: PropTypes.node.isRequired,
  isHidden: PropTypes.bool.isRequired,
  offsetVertical: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

const FloatCardPresentation = ({
  children, closeIcon, isHidden, offsetVertical, onClick,
}) => {
  const closeIconClasses = classnames({
    [css.smallScreensOnly]: closeIcon === 'small-screens-only',
  })

  const wrapperClasses = classnames(
    css.wrapperFloatCard,
    {
      [css.isHidden]: isHidden,
    },
  )

  return (
    <div className={wrapperClasses} style={{ bottom: offsetVertical }}>
      <LayoutPageWrapper>
        <div className={css.card}>
          {
            closeIcon
            && (
              <div className={closeIconClasses}>
                <CloseIcon onClick={onClick} />
              </div>
            )
          }
          {children}
        </div>
      </LayoutPageWrapper>
    </div>
  )
}

FloatCardPresentation.propTypes = propTypes

export {
  FloatCardPresentation,
}
