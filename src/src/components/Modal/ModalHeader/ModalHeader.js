import PropTypes from 'prop-types'
import React from 'react'
import css from './ModalHeader.css'

const ModalHeader = ({ children }) => (
  <h2 className={css.container}>{children}</h2>
)

ModalHeader.propTypes = {
  children: PropTypes.node,
}

export default ModalHeader
