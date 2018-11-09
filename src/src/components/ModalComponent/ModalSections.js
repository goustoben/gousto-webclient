import React, { PropTypes } from 'react'

import css from './ModalComponent.css'

const ModalTitle = ({ children }) => (
    <div className={css.modalTitle}>
        {children}
    </div>
)

const ModalContent = ({ children }) => (
    <div className={css.modalContent}>
        {children}
    </div>
)

const ModalFooter = ({ children }) => (
    <div className={css.modalFooter}>
        {children}
    </div>
)

ModalTitle.propTypes = {
  children: PropTypes.node,
}

ModalContent.propTypes = {
  children: PropTypes.node,
}

ModalFooter.propTypes = {
  children: PropTypes.node,
}

export {
  ModalTitle,
  ModalContent,
  ModalFooter,
}
