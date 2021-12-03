import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import css from './CollectionPicker.module.css'

export const Pill = ({ isActive, onClick, children }) => (
  <button type="button" className={classNames(css.pill)} onClick={onClick}>
    <div className={classNames(css.pillInternal, { [css.pillInternalIsActive]: isActive })}>
      {children}
    </div>
  </button>
)

Pill.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}
