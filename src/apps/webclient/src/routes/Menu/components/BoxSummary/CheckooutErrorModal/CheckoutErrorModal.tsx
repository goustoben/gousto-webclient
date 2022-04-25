import { CTA, Modal, ModalHeader, ModalBody } from 'goustouicomponents'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import configRoutes from 'config/routes'
import Link from 'Link'
import css from './CheckoutErrorModal.css'

export const CheckoutErrorModal = ({ shouldShow }: { shouldShow: boolean }) => {
  const [openModal, setOpenModal] = useState(shouldShow)

  useEffect(() => {
    setOpenModal(shouldShow)
  }, [shouldShow])

  const onClick = () => {
    setOpenModal(false)
  }

  return (
    <Modal
      isOpen={openModal}
      variant="floating"
      name="error-modal"
      description="checkout error modal"
      handleClose={onClick}
      withOverlay
    >
      <ModalHeader withSeparator align="left">
        Uh oh, something went wrong
      </ModalHeader>
      <ModalBody>
        <p className={css.modalText}>
          There was an issue when confirming your order. Head to your account to check your upcoming
          deliveries.
        </p>

        <Link to={configRoutes.client.myDeliveries}>
          <CTA size="medium" variant="primary" isFullWidth onClick={() => {}}>
            View deliveries
          </CTA>
        </Link>
      </ModalBody>
    </Modal>
  )
}

CheckoutErrorModal.propTypes = {
  shouldShow: PropTypes.bool.isRequired,
}
