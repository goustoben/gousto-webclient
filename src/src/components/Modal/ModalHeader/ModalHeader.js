import PropTypes from 'prop-types'
import React from 'react'
import css from './ModalHeader.module.css'

export const ModalHeader = ({ children }) => (
  <h2 className={css.container}>{children}</h2>
)

ModalHeader.propTypes = {
  children: PropTypes.node,
}

ModalHeader.defaultProps = {
  children: null
}
