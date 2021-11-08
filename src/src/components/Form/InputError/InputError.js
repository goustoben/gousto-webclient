import React from 'react'
import PropTypes from 'prop-types'
import css from './InputError.module.css'

export const InputError = ({ children }) => (
  <p className={css.inputError}>
    {children}
  </p>
)

InputError.propTypes = {
  children: PropTypes.node.isRequired,
}
