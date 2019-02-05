import React from 'react'
import PropTypes from 'prop-types'

import css from './Tooltip.css'

const Arrow = ({ position, orientation }) => (
  (position === orientation) ? (
    <div className={css.arrow__container}>
      <div className={`${css.arrow} ${css[`arrow--${orientation}`]}`} />
    </div>
  ) : null
)

const Tooltip = ({ arrow, children, style }) => (
  <div className={css.container} style={style}>
    <Arrow position="top" orientation={arrow} />
    <div className={css.content}>
      {children}
      <p className={css.cta}>NEXT &rsaquo;</p>
    </div>
    <Arrow position="bottom" orientation={arrow} />
  </div>
)

Tooltip.defaultProps = {
  arrow: 'top',
}

Tooltip.propTypes = {
  arrow: PropTypes.string,
  children: PropTypes.node,
}

export {
  Tooltip,
}
