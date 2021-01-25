import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import css from './Label.css'

const Label = ({ children, label, subLabel, isCheckoutOverhaulEnabled }) => (
  <label className={css.labelContainer}>
    <p className={classNames(css.label, { [css.labelRedesign]: isCheckoutOverhaulEnabled })}>{label}</p>
    {subLabel && <p className={classNames(css.subLabel, { [css.subLabelRedesign]: isCheckoutOverhaulEnabled })}>{subLabel}</p>}
    {children}
  </label>
)

Label.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
  subLabel: PropTypes.node,
  isCheckoutOverhaulEnabled: PropTypes.bool,
}

Label.defaultProps = {
  isCheckoutOverhaulEnabled: false,
}

export default Label
