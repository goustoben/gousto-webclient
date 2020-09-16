import React from 'react'
import PropTypes from 'prop-types'
import css from './InputWithButton.css'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const InputWithButton = ({ children }) => (
  <div className={css.wrapper}>
    {children}
  </div>
)

InputWithButton.propTypes = propTypes

export {
  InputWithButton,
}
