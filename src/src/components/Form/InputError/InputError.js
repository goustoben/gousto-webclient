import React from 'react'
import PropTypes from 'prop-types'
import css from './InputError.module.css'

const InputError = ({ children }) => (
  <p className={css.inputError}>
    {children}
  </p>
)

InputError.propTypes = {
  children: PropTypes.node.isRequired,
}

export default InputError
