import React from 'react'
import PropTypes from 'prop-types'
import css from './Pill.module.css'

const propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.bool,
  mouseEnter: PropTypes.func,
  mouseLeave: PropTypes.func,
  onClick: PropTypes.func.isRequired,
}

const defaultProps = {
  icon: false,
  mouseEnter: () => {},
  mouseLeave: () => {},
}

const Pill = ({
  onClick, children, icon, mouseEnter, mouseLeave,
}) => (
  <button
    type="button"
    onClick={onClick}
    onMouseEnter={mouseEnter}
    onMouseLeave={mouseLeave}
    className={css.button}
  >
    {children}
    {icon && <span className={css.rightChevron} />}
  </button>
)

Pill.propTypes = propTypes
Pill.defaultProps = defaultProps

export {
  Pill,
}
