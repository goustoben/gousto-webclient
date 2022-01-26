import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Modal, CTA } from 'goustouicomponents'
import { CheckoutUrgencyContext } from 'routes/Checkout/Components/CheckoutUrgency/CheckoutUrgencyContext'
import {
  checkoutUrgencyStatuses,
  checkoutUrgencyDefaultCriticalSeconds,
} from 'routes/Checkout/checkoutUrgencyConfig'
import {
  checkoutUrgencyInitialModalDismissed,
  checkoutUrgencyInitialModalPrimaryButtonClicked,
  checkoutUrgencyExpiredModalDismissed,
  checkoutUrgencyExpiredModalPrimaryButtonClicked,
} from 'actions/trackingKeys'
import { Clock } from '../Clock'
import css from './CheckoutUrgencyModal.css'

const getModalComponents = (isExpired) => {
  if (isExpired) {
    return {
      header: 'Your session has expired',
      explanation: 'Go back to the menu to check your recipes are still in stock',
      ctaText: 'Back to the menu',
    }
  } else {
    return {
      header: 'Your session is about to expire',
      explanation: 'Continue with checkout to avoid losing your recipes',
      ctaText: 'Continue with checkout',
    }
  }
}

export const CheckoutUrgencyModal = ({
  isOpen,
  isLoading,
  checkoutCreatePreviewOrder,
  checkoutUrgencySetCurrentStatus,
  redirectToMenu,
  modalSeconds,
  trackCheckoutUrgencyAction,
}) => {
  const remainingSeconds = useContext(CheckoutUrgencyContext)
  const isExpired = remainingSeconds === 0

  const isCritical =
    remainingSeconds === null || remainingSeconds <= checkoutUrgencyDefaultCriticalSeconds

  const handleClose = (mode) => {
    if (isExpired) {
      trackCheckoutUrgencyAction(
        mode === 'dismissed'
          ? checkoutUrgencyExpiredModalDismissed
          : checkoutUrgencyExpiredModalPrimaryButtonClicked
      )
      redirectToMenu()
      checkoutUrgencySetCurrentStatus(checkoutUrgencyStatuses.inactive)
    } else {
      trackCheckoutUrgencyAction(
        mode === 'dismissed'
          ? checkoutUrgencyInitialModalDismissed
          : checkoutUrgencyInitialModalPrimaryButtonClicked
      )
      checkoutCreatePreviewOrder()
    }
  }

  const { header, explanation, ctaText } = getModalComponents(isExpired)

  return (
    <div className={css.modalOverrides}>
      <Modal
        isOpen={isOpen}
        variant="floating"
        name="CheckoutUrgencyModal"
        handleClose={() => handleClose('dismissed')}
        withOverlay
        description={header}
      >
        <h2 className={css.header}>{header}</h2>
        <div className={css.body}>
          <div className={css.clockContainer}>
            <Clock seconds={remainingSeconds} total={modalSeconds} isCritical={isCritical} />
          </div>
          <div className={css.explanation}>{explanation}</div>
          <div className={css.ctaContainer}>
            <CTA
              size="medium"
              onClick={() => handleClose('cta')}
              variant="primary"
              isFullWidth
              isLoading={isLoading}
            >
              {ctaText}
            </CTA>
          </div>
        </div>
      </Modal>
    </div>
  )
}

CheckoutUrgencyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  checkoutCreatePreviewOrder: PropTypes.func.isRequired,
  redirectToMenu: PropTypes.func.isRequired,
  trackCheckoutUrgencyAction: PropTypes.func.isRequired,
  checkoutUrgencySetCurrentStatus: PropTypes.func.isRequired,
  modalSeconds: PropTypes.number.isRequired,
}
