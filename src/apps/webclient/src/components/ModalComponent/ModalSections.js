import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

import css from './ModalComponent.css'

const ModalTitle = ({ children, className }) => (
  <div className={classnames(css.modalTitle, className)}>
    {children}
  </div>
)

ModalTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

ModalTitle.defaultProps = {
  children: null,
  className: null,
}

const ModalContent = ({ children, className }) => (
  <div className={classnames(css.modalContent, className)}>
    {children}
  </div>
)

ModalContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

ModalContent.defaultProps = {
  children: null,
  className: null,
}

const ModalFooter = ({ children, className }) => (
  <div className={classnames(css.modalFooter, className)}>
    {children}
  </div>
)

ModalFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

ModalFooter.defaultProps = {
  children: null,
  className: null,
}

export {
  ModalTitle,
  ModalContent,
  ModalFooter,
}
