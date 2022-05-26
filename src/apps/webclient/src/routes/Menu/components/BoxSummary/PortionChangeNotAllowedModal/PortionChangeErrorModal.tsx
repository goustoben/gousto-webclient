import React from 'react'

import { CTA, Modal, ModalHeader } from 'goustouicomponents'
import PropTypes from 'prop-types'

import css from './PortionChangeErrorModal.css'

export const PortionChangeErrorModal = ({
  shouldShow,
  maxRecipesForPortion,
  onClose,
}: {
  shouldShow: boolean
  maxRecipesForPortion: number
  onClose: () => void
}) => (
  <Modal
    isOpen={shouldShow}
    variant="floating"
    name="error-modal"
    description="portion change error modal"
    handleClose={onClose}
    withOverlay
  >
    <div className={css.container}>
      <ModalHeader withSeparator align="left">
        There’s too many recipes in here
      </ModalHeader>

      <p className={css.content}>
        You can have up to {maxRecipesForPortion} recipes for this box size.
      </p>
      <ol className={css.modalList}>
        <li>Remove any extra recipes</li>
        <li>Change box size</li>
      </ol>

      <CTA size="medium" variant="primary" isFullWidth onClick={onClose}>
        Dismiss
      </CTA>
    </div>
  </Modal>
)

PortionChangeErrorModal.propTypes = {
  shouldShow: PropTypes.bool.isRequired,
}
