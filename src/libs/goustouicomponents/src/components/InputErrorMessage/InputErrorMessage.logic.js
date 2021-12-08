import React from 'react'
import PropTypes from 'prop-types'
import css from './InputErrorMessage.module.css'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const InputErrorMessage = ({ children }) => (
  <div className={css.error}>
    <span className={css.errorIcon} />
    {children}
  </div>
)

InputErrorMessage.propTypes = propTypes

export { InputErrorMessage }
