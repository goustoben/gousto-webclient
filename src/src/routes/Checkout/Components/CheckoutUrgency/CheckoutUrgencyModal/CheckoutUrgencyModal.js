import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody, CTA } from 'goustouicomponents'
import { CheckoutUrgencyContext } from 'routes/Checkout/Components/CheckoutUrgency/CheckoutUrgencyContext'
import { checkoutUrgencyDefaultCriticalSeconds } from 'routes/Checkout/checkoutUrgencyConfig'

const getModalComponents = (isExpired, remainingSeconds) => {
  if (isExpired) {
    return {
      header: 'Your session has expired',
      body: 'the timer will show 0',
      ctaText: 'Back to the menu',
    }
  } else {
    const isCritical =
      remainingSeconds === null || remainingSeconds <= checkoutUrgencyDefaultCriticalSeconds

    return {
      header: 'Your session is about to expire',
      body: (
        <div>
          the timer will show {remainingSeconds} {isCritical ? 'red' : 'black'}
        </div>
      ),
      ctaText: 'Continue with checkout',
    }
  }
}

export const CheckoutUrgencyModal = ({
  isOpen,
  isLoading,
  checkoutCreatePreviewOrder,
  redirectToMenu,
}) => {
  const remainingSeconds = useContext(CheckoutUrgencyContext)
  const isExpired = remainingSeconds === 0

  const handleClose = () => {
    if (isExpired) {
      redirectToMenu()
    } else {
      checkoutCreatePreviewOrder()
    }
  }

  const { header, body, ctaText } = getModalComponents(isExpired, remainingSeconds)

  return (
    <Modal
      isOpen={isOpen}
      variant="floating"
      name="CheckoutUrgencyModal"
      handleClose={handleClose}
      withOverlay
      description={header}
    >
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>
        {body}
        <CTA
          size="medium"
          onClick={handleClose}
          variant="primary"
          isFullWidth
          isLoading={isLoading}
        >
          {ctaText}
        </CTA>
      </ModalBody>
    </Modal>
  )
}

CheckoutUrgencyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  checkoutCreatePreviewOrder: PropTypes.func.isRequired,
  redirectToMenu: PropTypes.func.isRequired,
}
