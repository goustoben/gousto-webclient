import React from 'react'
import PropTypes from 'prop-types'
import css from './InputLabel.module.css'

const propTypes = {
  children: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
}

const InputLabel = ({ children, inputId }) => (
  <label className={css.label} htmlFor={inputId}>{children}</label>
)

InputLabel.propTypes = propTypes

export { InputLabel }
