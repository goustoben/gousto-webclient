import React from 'react'
import PropTypes from 'prop-types'

import { Arrow } from './Arrow'

import css from './Tooltip.css'

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
  style: PropTypes.objectOf(PropTypes.string),
}

export {
  Tooltip,
}
