import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Modal, ModalHeader } from '../../../Modal'

import css from './OptionsWrapper.module.css'

export const OptionsWrapper = ({
  isExpanded,
  children,
  isMobile,
  name,
  toggleOptionsVisibility,
}) => (isMobile ? (
  <Modal
    description={`${name} Select Modal`}
    isOpen={isExpanded}
    name={name}
    variant="fullScreen"
    handleClose={toggleOptionsVisibility}
  >
    <ModalHeader withSeparator align="left">
      {name}
    </ModalHeader>
    {children}
  </Modal>
) : (
  <div className={classnames(css.wrapper, { [css.isExpanded]: isExpanded })} aria-hidden={!isExpanded}>
    {children}
  </div>
))

OptionsWrapper.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  toggleOptionsVisibility: PropTypes.func.isRequired,
}

OptionsWrapper.defaultProps = {
  isMobile: false,
}
