import PropTypes from 'prop-types'
import React from 'react'
import css from './Label.css'

export const Label = ({ children, label, subLabel }) => (
  <label className={css.labelContainer}>
    <p className={css.label}>{label}</p>
    {subLabel && <p className={css.sublabel}>{subLabel}</p>}
    {children}
  </label>
)

Label.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
  subLabel: PropTypes.node,
}
