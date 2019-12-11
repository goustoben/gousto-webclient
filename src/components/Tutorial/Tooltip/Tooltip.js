import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'Icon'
import { Arrow } from './Arrow'

import css from './Tooltip.css'

const Tooltip = ({ arrow, children, style, arrowStyle, contentStyle, onClose }) => (
  <div className={css.container} style={style}>
    <Arrow positionY="top" position={arrow} />
    {(onClose) ? (
      <div className={css.close} onClick={onClose}>
        <Icon name="fa-times" />
      </div>
    ) : null}
    <div className={css.tooltip__content} style={contentStyle}>
      {children}
    </div>
    <Arrow positionY="bottom" position={arrow} style={arrowStyle} />
  </div>
)

Tooltip.defaultProps = {
  arrow: 'top',
}

Tooltip.propTypes = {
  arrow: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])),
  arrowStyle: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])),
  contentStyle: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]))
}

export {
  Tooltip,
}
