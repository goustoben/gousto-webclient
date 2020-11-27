import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Modal, ModalHeader } from 'goustouicomponents'

import css from './ExpandedContent.css'

export const ExpandedContent = ({
  isMobile,
  children,
  title,
  isExpanded,
  collapseSection
}) => (
  isMobile
    ? (
      <Modal
        withOverlay
        name={title}
        description={`${title} Modal`}
        isOpen={isExpanded}
        animated
        variant="bottomSheet"
        handleClose={collapseSection}
      >
        <ModalHeader
          withSeparator
          align="left"
        >
          {title}
        </ModalHeader>
        <div className={css.modalBodyContainer}>
          {children}
        </div>
      </Modal>
    )
    : <Fragment>{children}</Fragment>)

ExpandedContent.propTypes = {
  isMobile: PropTypes.bool,
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  isExpanded: PropTypes.bool,
  collapseSection: PropTypes.func.isRequired,
}

ExpandedContent.defaultProps = {
  isMobile: false,
  isExpanded: false
}
