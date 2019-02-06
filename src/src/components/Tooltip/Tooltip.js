import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'Icon'
import { Arrow } from './Arrow'

import css from './Tooltip.css'

const Tooltip = ({ arrow, children, style, last, onClose }) => (
  <div className={css.container} style={style}>
    <Arrow positionY="top" position={arrow} />
    <div className={css.close} onClick={onClose}>
      <Icon name="fa-times" />
    </div>
    <div className={css.content}>
      {children}
      <p className={css.cta}>{(last) ? 'OK' : 'NEXT &rsaquo'}</p>
    </div>
    <Arrow positionY="bottom" position={arrow} />
  </div>
)

Tooltip.defaultProps = {
  arrow: 'top',
  last: true,
}

Tooltip.propTypes = {
  arrow: PropTypes.string,
  children: PropTypes.node,
  last: PropTypes.bool,
  onClose: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.string),
}

export {
  Tooltip,
}
