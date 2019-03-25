import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

import css from './ModalComponent.css'

const ModalTitle = ({ children, className }) => (
    <div className={classnames(css.modalTitle, className)}>
        {children}
    </div>
)

const ModalContent = ({ children, className }) => (
    <div className={classnames(css.modalContent, className)}>
        {children}
    </div>
)

const ModalFooter = ({ children, position }) => (
    <div className={classnames(css.modalFooter, position)}>
        {children}
    </div>
)

ModalTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

ModalContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

ModalFooter.propTypes = {
  children: PropTypes.node,
  position: PropTypes.string,
}

export {
  ModalTitle,
  ModalContent,
  ModalFooter,
}
