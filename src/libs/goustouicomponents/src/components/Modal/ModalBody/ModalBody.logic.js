import React from 'react'
import PropTypes from 'prop-types'

import css from './ModalBody.module.css'

const ModalBody = ({ children }) => (
  <div data-testing="modalBody" className={css.modalBody}>
    {children}
  </div>
)

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
}

export { ModalBody }
