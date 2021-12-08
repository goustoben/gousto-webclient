import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import css from './ModalHeader.module.css'

const ModalHeader = ({ children, withSeparator, align }) => {
  const modalHeaderClassnames = classnames(
    css.modalHeaderHeading,
    { [css.withSeparator]: withSeparator },
    { [css.alignLeft]: align === 'left' },
  )

  return <h2 className={modalHeaderClassnames} data-testing="modal-header">{children}</h2>
}

ModalHeader.propTypes = {
  children: PropTypes.node.isRequired,
  withSeparator: PropTypes.bool,
  align: PropTypes.oneOf(['left', 'center']),
}

ModalHeader.defaultProps = {
  withSeparator: false,
  align: 'center',
}

ModalHeader.displayName = 'ModalHeader'

export { ModalHeader }
